from datetime import date
from unittest.mock import Mock

from fastapi.testclient import TestClient

from app.models import FestivalDay, FestivalEdition, FestivalRun, FestivalSeries


def build_festival() -> FestivalEdition:
    festival_series = FestivalSeries(
        id=1,
        slug="lollapalooza-chicago",
        name="Lollapalooza Chicago",
    )

    festival = FestivalEdition(
        id=1,
        festival_series_id=1,
        festival_series=festival_series,
        slug="lollapalooza-2026",
        name="Lollapalooza 2026",
        year=2026,
        city="Chicago",
        state="Illinois",
        country="United States",
        timezone="America/Chicago",
    )

    festival_run = FestivalRun(
        id=1,
        festival_edition_id=1,
        slug="main",
        name="Main Run",
        display_order=1,
    )

    festival_run.days = [
        FestivalDay(
            id=1,
            festival_run_id=1,
            date=date(2026, 7, 30),
            label=None,
            display_order=1,
        ),
        FestivalDay(
            id=2,
            festival_run_id=1,
            date=date(2026, 7, 31),
            label=None,
            display_order=2,
        ),
    ]

    festival.runs = [festival_run]

    return festival


def test_read_festival_returns_nested_festival(
    client: TestClient,
    mock_session: Mock,
) -> None:
    mock_session.scalar.return_value = build_festival()
    # No run id comes back as having a scheduled Appearance.
    mock_session.scalars.return_value = []

    response = client.get("/api/v1/festivals/lollapalooza-2026")

    assert response.status_code == 200

    body = response.json()

    assert body["slug"] == "lollapalooza-2026"
    assert body["name"] == "Lollapalooza 2026"
    assert body["year"] == 2026
    assert body["festival_series"] == {
        "id": 1,
        "slug": "lollapalooza-chicago",
        "name": "Lollapalooza Chicago",
    }
    assert body["runs"][0]["name"] == "Main Run"
    assert body["runs"][0]["schedule_state"] == "announced"
    assert [day["date"] for day in body["runs"][0]["days"]] == [
        "2026-07-30",
        "2026-07-31",
    ]
    mock_session.scalar.assert_called_once()


def test_read_festival_marks_run_scheduled_when_it_has_a_scheduled_appearance(
    client: TestClient,
    mock_session: Mock,
) -> None:
    mock_session.scalar.return_value = build_festival()
    # The `main` run (id 1) has at least one scheduled Appearance.
    mock_session.scalars.return_value = [1]

    response = client.get("/api/v1/festivals/lollapalooza-2026")

    assert response.status_code == 200
    assert response.json()["runs"][0]["schedule_state"] == "scheduled"


def test_read_festival_returns_404_when_missing(
    client: TestClient,
    mock_session: Mock,
) -> None:
    mock_session.scalar.return_value = None

    response = client.get("/api/v1/festivals/bad-one")

    assert response.status_code == 404
    assert response.json() == {"detail": "Festival not found"}
