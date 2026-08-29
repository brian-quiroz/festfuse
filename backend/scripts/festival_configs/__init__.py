"""Per-edition seed configs.

Each edition is one module exporting an ``EditionConfig``; this file is the registry
``seed_festivals`` iterates. Adding a festival: add a module, add it to
``FESTIVAL_CONFIGS`` — nothing else changes.
"""

from ._types import EditionConfig, RunConfig, StageConfig
from .acl_2026 import ACL_2026
from .lollapalooza_2026 import LOLLAPALOOZA_2026

FESTIVAL_CONFIGS: tuple[EditionConfig, ...] = (LOLLAPALOOZA_2026, ACL_2026)

__all__ = [
    "EditionConfig",
    "RunConfig",
    "StageConfig",
    "FESTIVAL_CONFIGS",
    "LOLLAPALOOZA_2026",
    "ACL_2026",
]
