"""Clean-bootstrap smoke test (artist authoring roadmap section 5, ADR-0014).

Proves the from-empty half of "rebuild the database from PostgreSQL alone": every
migration applies to a brand-new database, the resulting schema matches the SQLAlchemy
metadata, and the festival seed runs against it. The ``pg_dump`` / ``pg_restore`` round
trip is verified by running ``docs/operations/backup-restore.md`` by hand.

The test creates a disposable database, works only against that, and drops it in
teardown. It never touches the developer's configured database.
"""

import os
import subprocess
import sys
import uuid
from collections.abc import Iterator

import pytest
from sqlalchemy import create_engine, text

from app.config import BACKEND_DIR, settings
from app.database import database_url

pytestmark = [
    pytest.mark.postgres,
    pytest.mark.skipif(
        os.getenv("RUN_POSTGRES_INTEGRATION") != "1",
        reason="set RUN_POSTGRES_INTEGRATION=1 to use local PostgreSQL",
    ),
]

_DB_PREFIX = "festfuse_cleanboot_"


@pytest.fixture
def disposable_db() -> Iterator[str]:
    name = f"{_DB_PREFIX}{uuid.uuid4().hex[:12]}"
    # Never operate on a name we did not generate, or the developer's own database.
    assert name.startswith(_DB_PREFIX)
    assert name != settings.postgres_db

    admin = create_engine(
        database_url.set(database="postgres"), isolation_level="AUTOCOMMIT"
    )
    try:
        with admin.connect() as connection:
            connection.execute(text(f'CREATE DATABASE "{name}"'))
        yield name
    finally:
        with admin.connect() as connection:
            connection.execute(
                text(
                    "SELECT pg_terminate_backend(pid) FROM pg_stat_activity "
                    "WHERE datname = :name AND pid <> pg_backend_pid()"
                ),
                {"name": name},
            )
            connection.execute(text(f'DROP DATABASE IF EXISTS "{name}"'))
        admin.dispose()


def _run(module_args: list[str], db_name: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, "-m", *module_args],
        cwd=BACKEND_DIR,
        env={**os.environ, "POSTGRES_DB": db_name},
        capture_output=True,
        text=True,
    )


def test_clean_bootstrap_from_empty(disposable_db: str) -> None:
    upgrade = _run(["alembic", "upgrade", "head"], disposable_db)
    assert upgrade.returncode == 0, upgrade.stderr

    check = _run(["alembic", "check"], disposable_db)
    assert check.returncode == 0, check.stdout + check.stderr

    seed = _run(["scripts.seed_festival"], disposable_db)
    assert seed.returncode == 0, seed.stderr

    engine = create_engine(database_url.set(database=disposable_db))
    try:
        with engine.connect() as connection:
            counts = {
                table: connection.scalar(text(f"SELECT count(*) FROM {table}"))
                for table in ("festival_editions", "festival_runs", "festival_days")
            }
    finally:
        engine.dispose()

    assert counts == {
        "festival_editions": 1,
        "festival_runs": 1,
        "festival_days": 4,
    }
