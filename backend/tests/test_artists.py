from datetime import date, datetime
from unittest.mock import Mock
from zoneinfo import ZoneInfo

from fastapi.testclient import TestClient

from app.repositories import artists as artist_queries
from app.schemas.artist import (
    ArtistCoreRead,
    ArtistGenreFamilyRead,
    ArtistGenreRead,
    ArtistListenFirstRead,
    ArtistLocationRead,
    ArtistSocialsRead,
    ArtistTrackRead,
    ArtistVideoRead,
    FestivalArtistAppearanceRead,
    FestivalArtistContextRead,
    FestivalArtistEditionRead,
    FestivalArtistRead,
    FestivalArtistRunRead,
    FestivalArtistStageRead,
    FestivalRunArtistRead,
    FestivalSimilarArtistRead,
)


def build_artist() -> ArtistCoreRead:
    return ArtistCoreRead(
        slug="test-artist",
        name="Test Artist",
        spotify_artist_id="spotify-artist",
        image=None,
        location=ArtistLocationRead(
            city="Chicago",
            state="Illinois",
            country="United States",
        ),
        genres=[
            ArtistGenreRead(
                slug="house",
                name="House",
                is_primary=True,
                display_order=1,
                family=ArtistGenreFamilyRead(
                    slug="electronic",
                    name="Electronic",
                ),
            )
        ],
        quick_picks_track=ArtistTrackRead(
            spotify_track_id="spotify-track",
            name="Test Track",
        ),
        listen_first=ArtistListenFirstRead(note=None, tracks=[]),
        about="A verified artist biography.",
        socials=ArtistSocialsRead(
            spotify_url="https://open.spotify.com/artist/spotify-artist",
            youtube_url="https://youtube.com/@testartist",
            tiktok_url=None,
        ),
        featured_video=ArtistVideoRead(
            youtube_video_id="featured-video",
            label="Live at Test Festival",
        ),
    )


def build_festival_artist() -> FestivalArtistRead:
    return FestivalArtistRead(
        artist=build_artist(),
        festival_context=FestivalArtistContextRead(
            edition=FestivalArtistEditionRead(
                slug="lollapalooza-2026",
                name="Lollapalooza 2026",
                timezone="America/Chicago",
            ),
            run=FestivalArtistRunRead(slug="main", name="Main Run"),
            billing_tier="headliner",
            appearances=[
                FestivalArtistAppearanceRead(
                    id=42,
                    status="scheduled",
                    festival_date=date(2026, 7, 30),
                    starts_at=datetime(
                        2026,
                        7,
                        30,
                        20,
                        tzinfo=ZoneInfo("America/Chicago"),
                    ),
                    ends_at=datetime(
                        2026,
                        7,
                        30,
                        21,
                        tzinfo=ZoneInfo("America/Chicago"),
                    ),
                    stage=FestivalArtistStageRead(
                        slug="t-mobile",
                        name="T-Mobile",
                    ),
                    cancellation_reason=None,
                )
            ],
            similar_artists=[
                FestivalSimilarArtistRead(
                    slug=f"similar-{display_order}",
                    name=f"Similar Artist {display_order}",
                    display_order=display_order,
                    image=None,
                    genres=[
                        ArtistGenreRead(
                            slug="house",
                            name="House",
                            is_primary=True,
                            display_order=1,
                            family=ArtistGenreFamilyRead(
                                slug="electronic",
                                name="Electronic",
                            ),
                        )
                    ],
                )
                for display_order in range(1, 5)
            ],
        ),
    )


def test_read_artist_returns_typed_artist_core(
    client: TestClient,
    mock_session: Mock,
    monkeypatch,
) -> None:
    read_query = Mock(return_value=build_artist())
    monkeypatch.setattr(
        artist_queries,
        "read_published_artist_by_slug",
        read_query,
    )

    response = client.get("/api/v1/artists/test-artist")

    assert response.status_code == 200
    assert response.json() == {
        "slug": "test-artist",
        "name": "Test Artist",
        "spotify_artist_id": "spotify-artist",
        "image": None,
        "location": {
            "city": "Chicago",
            "state": "Illinois",
            "country": "United States",
        },
        "genres": [
            {
                "slug": "house",
                "name": "House",
                "is_primary": True,
                "display_order": 1,
                "family": {"slug": "electronic", "name": "Electronic"},
            }
        ],
        "quick_picks_track": {
            "spotify_track_id": "spotify-track",
            "name": "Test Track",
        },
        "listen_first": {"note": None, "tracks": []},
        "about": "A verified artist biography.",
        "socials": {
            "spotify_url": "https://open.spotify.com/artist/spotify-artist",
            "youtube_url": "https://youtube.com/@testartist",
            "tiktok_url": None,
        },
        "featured_video": {
            "youtube_video_id": "featured-video",
            "label": "Live at Test Festival",
        },
    }
    read_query.assert_called_once_with(mock_session, "test-artist")


def test_read_artist_returns_404_when_query_finds_no_public_artist(
    client: TestClient,
    monkeypatch,
) -> None:
    monkeypatch.setattr(
        artist_queries,
        "read_published_artist_by_slug",
        Mock(return_value=None),
    )

    response = client.get("/api/v1/artists/missing")

    assert response.status_code == 404
    assert response.json() == {"detail": "Artist not found"}


def test_read_artist_reports_published_data_inconsistency(
    client: TestClient,
    monkeypatch,
) -> None:
    read_query = Mock(
        side_effect=artist_queries.PublishedArtistConsistencyError("bad quick picks")
    )
    monkeypatch.setattr(
        artist_queries,
        "read_published_artist_by_slug",
        read_query,
    )

    response = client.get("/api/v1/artists/corrupt")

    assert response.status_code == 500
    assert response.json() == {"detail": "Published artist data is inconsistent"}


def test_read_festival_artist_returns_explicit_run_context(
    client: TestClient,
    mock_session: Mock,
    monkeypatch,
) -> None:
    read_query = Mock(return_value=build_festival_artist())
    monkeypatch.setattr(
        artist_queries,
        "read_festival_artist_by_slug",
        read_query,
    )

    response = client.get(
        "/api/v1/festivals/lollapalooza-2026/runs/main/artists/test-artist"
    )

    assert response.status_code == 200
    assert response.json()["festival_context"] == {
        "edition": {
            "slug": "lollapalooza-2026",
            "name": "Lollapalooza 2026",
            "timezone": "America/Chicago",
        },
        "run": {"slug": "main", "name": "Main Run"},
        "billing_tier": "headliner",
        "appearances": [
            {
                "id": 42,
                "status": "scheduled",
                "festival_date": "2026-07-30",
                "starts_at": "2026-07-30T20:00:00-05:00",
                "ends_at": "2026-07-30T21:00:00-05:00",
                "stage": {"slug": "t-mobile", "name": "T-Mobile"},
                "cancellation_reason": None,
            }
        ],
        "similar_artists": [
            {
                "slug": f"similar-{display_order}",
                "name": f"Similar Artist {display_order}",
                "display_order": display_order,
                "image": None,
                "genres": [
                    {
                        "slug": "house",
                        "name": "House",
                        "is_primary": True,
                        "display_order": 1,
                        "family": {
                            "slug": "electronic",
                            "name": "Electronic",
                        },
                    }
                ],
            }
            for display_order in range(1, 5)
        ],
    }
    read_query.assert_called_once_with(
        mock_session,
        edition_slug="lollapalooza-2026",
        run_slug="main",
        artist_slug="test-artist",
    )


def test_read_festival_artist_returns_404_outside_announced_run(
    client: TestClient,
    monkeypatch,
) -> None:
    monkeypatch.setattr(
        artist_queries,
        "read_festival_artist_by_slug",
        Mock(return_value=None),
    )

    response = client.get(
        "/api/v1/festivals/lollapalooza-2026/runs/main/artists/missing"
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Festival artist not found"}


def build_run_artist() -> FestivalRunArtistRead:
    return FestivalRunArtistRead(
        slug="test-artist",
        name="Test Artist",
        image=None,
        location=ArtistLocationRead(
            city="Austin",
            state="Texas",
            country="United States",
        ),
        genres=[
            ArtistGenreRead(
                slug="house",
                name="House",
                is_primary=True,
                display_order=1,
                family=ArtistGenreFamilyRead(slug="electronic", name="Electronic"),
            )
        ],
        billing_tier="headliner",
        quick_picks_track=ArtistTrackRead(
            spotify_track_id="spotify-track",
            name="Test Track",
        ),
        similar_artists=[],
    )


def test_read_festival_run_artists_returns_announced_published_artists(
    client: TestClient,
    mock_session: Mock,
    monkeypatch,
) -> None:
    read_query = Mock(return_value=[build_run_artist()])
    monkeypatch.setattr(artist_queries, "read_festival_run_artists", read_query)

    response = client.get("/api/v1/festivals/acl-2026/runs/weekend-1/artists")

    assert response.status_code == 200
    body = response.json()
    assert [artist["slug"] for artist in body] == ["test-artist"]
    assert body[0]["similar_artists"] == []
    read_query.assert_called_once_with(
        mock_session,
        edition_slug="acl-2026",
        run_slug="weekend-1",
    )


def test_read_festival_run_artists_returns_404_for_unknown_run(
    client: TestClient,
    monkeypatch,
) -> None:
    monkeypatch.setattr(
        artist_queries,
        "read_festival_run_artists",
        Mock(return_value=None),
    )

    response = client.get("/api/v1/festivals/acl-2026/runs/not-a-run/artists")

    assert response.status_code == 404
    assert response.json() == {"detail": "Festival run not found"}
