"""Pure parsers and controlled vocabularies for artist authoring input.

Format rules for the fields that arrive as strings (Spotify artist URLs, the image
focal point, appearance times) and the source billing-tier vocabulary. No I/O, no
database. ``app.lib`` is for pure, dependency-free helpers, mirroring the frontend's
``app/lib``.
"""

import re
import unicodedata
from datetime import datetime
from urllib.parse import urlparse
from zoneinfo import ZoneInfo

SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
FOCAL_Y_PATTERN = re.compile(r"^center\s+(\d{1,3})%$")
SPOTIFY_ARTIST_PATTERN = re.compile(r"^https://open\.spotify\.com/artist/([^/?#]+)")
MBID_PATTERN = re.compile(
    r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
)

# Source billing-tier label -> stored LineupEntry.billing_tier value.
BILLING_TIERS = {
    "Headliner": "headliner",
    "Sub-headliner": "sub_headliner",
    "Undercard": "undercard",
}


def valid_url(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def normalize_name(value: str) -> str:
    """NFC-normalize a display name.

    macOS clipboards and some spreadsheet exports hand back decomposed (NFD) text: a
    base letter followed by a separate combining accent, rather than the single
    precomposed character. The two render identically but only NFC compares, indexes,
    and round-trips predictably, so names are canonicalized at the authoring boundary.
    """
    return unicodedata.normalize("NFC", value)


def parse_focal_y(value: str | None) -> int | None:
    """``"center 40%"`` -> ``40``. Raises ValueError on any other shape."""
    if value is None:
        return None
    match = FOCAL_Y_PATTERN.fullmatch(value)
    if not match:
        raise ValueError(f"unsupported objectPosition {value!r}")
    percent = int(match.group(1))
    if percent > 100:
        raise ValueError(f"objectPosition percentage exceeds 100: {value!r}")
    return percent


def parse_spotify_artist_id(value: str | None) -> str | None:
    """Extract the artist id from an ``open.spotify.com/artist/<id>`` URL."""
    if value is None:
        return None
    match = SPOTIFY_ARTIST_PATTERN.match(value)
    if not match:
        raise ValueError(f"unsupported Spotify artist URL {value!r}")
    return match.group(1)


def parse_appearance_time(
    date_value: str, time_value: str, *, year: int, timezone: str
) -> datetime:
    """``("Jul 30", "8:30 PM", year=2026, tz)`` -> an aware datetime in that zone."""
    naive = datetime.strptime(f"{date_value} {year} {time_value}", "%b %d %Y %I:%M %p")
    return naive.replace(tzinfo=ZoneInfo(timezone))
