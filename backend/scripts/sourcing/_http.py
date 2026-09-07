"""Shared HTTP GET for the sourcing wrappers: User-Agent, JSON parse, 429 backoff.

Both the Wikimedia and Flickr APIs rate-limited bulk runs, so every request goes
through :func:`get_json`, which retries on HTTP 429 / 503 with exponential backoff.
"""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request

USER_AGENT = "FestFuse-image-sourcing/1.0 (portfolio project; https://github.com/brian-quiroz/festfuse)"


def get_json(url: str, params: dict | None = None, *, retries: int = 4) -> dict:
    """GET ``url`` (with optional query ``params``) and return the parsed JSON body.

    Retries on 429 and 503 with 2s, 4s, 8s, 16s backoff; raises on the final failure
    or any other HTTP error.
    """
    if params:
        url = url + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req) as resp:
                return json.load(resp)
        except urllib.error.HTTPError as err:
            if err.code in (429, 503) and attempt < retries:
                time.sleep(2 ** (attempt + 1))
                continue
            raise


def download(url: str, dest: str) -> None:
    """Download ``url`` to the local path ``dest`` (used for preview thumbnails)."""
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req) as resp:
        with open(dest, "wb") as out:
            out.write(resp.read())
