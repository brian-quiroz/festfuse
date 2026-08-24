from unittest.mock import Mock

from fastapi.testclient import TestClient

from app.queries import artists as artist_queries
from app.schemas.artist import (
    ArtistCoreRead,
    ArtistGenreFamilyRead,
    ArtistGenreRead,
    ArtistListenFirstRead,
    ArtistLocationRead,
    ArtistTrackRead,
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
