"""Fast, no-network coverage for the link classifier and target extraction
(check_artist_links.py). Real requests are a manual/operational step, not a test."""

from types import SimpleNamespace

import pytest

from scripts import check_artist_links
from scripts.check_artist_links import classify, link_targets


@pytest.mark.parametrize(
    ("status", "oembed", "expected"),
    [
        (200, False, "ok"),
        (204, False, "ok"),
        (301, False, "unverifiable"),
        (404, False, "broken"),
        (410, False, "broken"),
        (403, False, "unverifiable"),
        (429, False, "unverifiable"),
        (500, False, "unverifiable"),
        (None, False, "unverifiable"),
        (404, True, "broken"),
        (400, True, "broken"),
        (401, True, "broken"),
        (401, False, "unverifiable"),
        (403, True, "unverifiable"),
    ],
)
def test_classify(status: int | None, oembed: bool, expected: str) -> None:
    assert classify(status, oembed=oembed) == expected


def _artist(**overrides: object) -> SimpleNamespace:
    base = dict(
        spotify_artist_id="1Xyqqq0kxf4t9pWZLWX1UB",
        track_selections=[
            SimpleNamespace(
                is_quick_picks=True,
                track=SimpleNamespace(spotify_track_id="2MvvoeRt8NcOXWESkxWn3g"),
            )
        ],
        videos=[SimpleNamespace(youtube_video_id="abc12345678")],
        youtube_url="https://youtube.com/@artist",
        tiktok_url=None,
        image_source_url="https://example.com/photo",
        image_license_url=None,
        image_url="/artists/global/artist.jpg",
    )
    base.update(overrides)
    return SimpleNamespace(**base)


def test_link_targets_covers_every_stored_identifier() -> None:
    targets = link_targets(_artist())
    labels = [target.label for target in targets]

    assert labels == [
        "spotify artist",
        "spotify track (quick picks)",
        "youtube video",
        "youtube url",
        "image source",
        "image url",
    ]
    spotify_artist = targets[0]
    assert spotify_artist.oembed is True
    assert spotify_artist.check_url.startswith("https://open.spotify.com/oembed?url=")


def test_local_image_path_has_no_check_url_but_a_remote_one_does() -> None:
    local = link_targets(_artist(image_url="/artists/global/x.jpg"))[-1]
    assert local.label == "image url" and local.check_url is None

    remote = link_targets(_artist(image_url="https://cdn.example.com/x.jpg"))[-1]
    assert remote.check_url == "https://cdn.example.com/x.jpg"


def test_check_artists_maps_statuses_and_marks_local_assets_unverifiable(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    statuses = {
        "https://youtube.com/@artist": 200,
        "https://example.com/photo": 404,
    }

    def fake_status(url: str, timeout: float) -> int | None:
        if "open.spotify.com/oembed" in url:
            return 200
        if "youtube.com/oembed" in url:
            return 401  # private / removed video
        return statuses.get(url)

    monkeypatch.setattr(check_artist_links, "_http_status", fake_status)

    artist = _artist()
    artist.slug = "an-artist"
    by_slug = check_artist_links.check_artists([artist], timeout=5.0, jobs=4)
    by_label = {target.label: state for target, state in by_slug["an-artist"]}

    assert by_label["spotify artist"] == "ok"
    assert by_label["spotify track (quick picks)"] == "ok"
    assert by_label["youtube video"] == "broken"  # oembed 401
    assert by_label["youtube url"] == "ok"
    assert by_label["image source"] == "broken"  # 404
    assert by_label["image url"] == "unverifiable"  # local asset


def test_unverifiable_is_retried_once(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(check_artist_links.time, "sleep", lambda _s: None)
    calls: list[str] = []

    def flaky_status(url: str, timeout: float) -> int | None:
        calls.append(url)
        return None if len(calls) == 1 else 200  # first attempt fails, retry succeeds

    monkeypatch.setattr(check_artist_links, "_http_status", flaky_status)
    target = check_artist_links.LinkTarget(
        "x", "x", "https://example.com/x", oembed=False
    )

    assert check_artist_links._resolve_target(target, timeout=5.0) == "ok"
    assert len(calls) == 2

    # A confirmed 404 is "broken" on the first try and is not retried.
    calls.clear()
    monkeypatch.setattr(
        check_artist_links, "_http_status", lambda u, t: (calls.append(u), 404)[1]
    )
    assert check_artist_links._resolve_target(target, timeout=5.0) == "broken"
    assert len(calls) == 1
