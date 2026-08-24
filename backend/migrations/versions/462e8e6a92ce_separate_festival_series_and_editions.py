"""separate festival series and editions

Revision ID: 462e8e6a92ce
Revises: 555c13b3f93a
Create Date: 2026-08-23 18:56:03.156666

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '462e8e6a92ce'
down_revision: Union[str, Sequence[str], None] = '555c13b3f93a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "festival_series",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("slug", sa.String(length=100), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_festival_series_slug"),
        "festival_series",
        ["slug"],
        unique=True,
    )

    op.execute(
        """
        INSERT INTO festival_series (slug, name)
        VALUES ('lollapalooza-chicago', 'Lollapalooza Chicago')
        """
    )

    op.add_column(
        "festivals",
        sa.Column("festival_series_id", sa.Integer(), nullable=True),
    )
    op.add_column(
        "festivals",
        sa.Column("year", sa.SmallInteger(), nullable=True),
    )
    op.add_column(
        "festivals",
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.add_column(
        "festivals",
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

    op.execute(
        """
        UPDATE festivals
        SET festival_series_id = (
                SELECT id
                FROM festival_series
                WHERE slug = 'lollapalooza-chicago'
            ),
            year = 2026
        WHERE slug = 'lollapalooza-2026'
        """
    )

    op.alter_column("festivals", "festival_series_id", nullable=False)
    op.alter_column("festivals", "year", nullable=False)
    op.rename_table("festivals", "festival_editions")
    op.execute(
        "ALTER TABLE festival_editions "
        "RENAME CONSTRAINT festivals_pkey TO festival_editions_pkey"
    )
    op.execute(
        "ALTER INDEX ix_festivals_slug RENAME TO ix_festival_editions_slug"
    )
    op.execute(
        "ALTER SEQUENCE festivals_id_seq RENAME TO festival_editions_id_seq"
    )
    op.create_index(
        op.f("ix_festival_editions_festival_series_id"),
        "festival_editions",
        ["festival_series_id"],
        unique=False,
    )
    op.create_foreign_key(
        "festival_editions_festival_series_id_fkey",
        "festival_editions",
        "festival_series",
        ["festival_series_id"],
        ["id"],
        ondelete="CASCADE",
    )

    op.alter_column(
        "festival_runs",
        "festival_id",
        new_column_name="festival_edition_id",
        existing_type=sa.Integer(),
        existing_nullable=False,
    )
    op.execute(
        "ALTER INDEX ix_festival_runs_festival_id "
        "RENAME TO ix_festival_runs_festival_edition_id"
    )
    op.execute(
        "ALTER TABLE festival_runs "
        "RENAME CONSTRAINT festival_runs_festival_id_fkey "
        "TO festival_runs_festival_edition_id_fkey"
    )
    op.execute(
        "ALTER TABLE festival_runs "
        "RENAME CONSTRAINT uq_festival_runs_festival_slug "
        "TO uq_festival_runs_edition_slug"
    )

    for table_name in ("festival_runs", "festival_days"):
        op.add_column(
            table_name,
            sa.Column(
                "created_at",
                sa.DateTime(timezone=True),
                server_default=sa.text("now()"),
                nullable=False,
            ),
        )
        op.add_column(
            table_name,
            sa.Column(
                "updated_at",
                sa.DateTime(timezone=True),
                server_default=sa.text("now()"),
                nullable=False,
            ),
        )

    op.execute(
        """
        CREATE FUNCTION set_updated_at_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql
        """
    )

    for table_name in (
        "festival_series",
        "festival_editions",
        "festival_runs",
        "festival_days",
    ):
        op.execute(
            f"""
            CREATE TRIGGER trg_{table_name}_updated_at
            BEFORE UPDATE ON {table_name}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at_timestamp()
            """
        )


def downgrade() -> None:
    """Downgrade schema."""
    for table_name in (
        "festival_series",
        "festival_editions",
        "festival_runs",
        "festival_days",
    ):
        op.execute(f"DROP TRIGGER trg_{table_name}_updated_at ON {table_name}")

    op.execute("DROP FUNCTION set_updated_at_timestamp()")

    for table_name in ("festival_days", "festival_runs"):
        op.drop_column(table_name, "updated_at")
        op.drop_column(table_name, "created_at")

    op.execute(
        "ALTER TABLE festival_runs "
        "RENAME CONSTRAINT uq_festival_runs_edition_slug "
        "TO uq_festival_runs_festival_slug"
    )
    op.execute(
        "ALTER TABLE festival_runs "
        "RENAME CONSTRAINT festival_runs_festival_edition_id_fkey "
        "TO festival_runs_festival_id_fkey"
    )
    op.execute(
        "ALTER INDEX ix_festival_runs_festival_edition_id "
        "RENAME TO ix_festival_runs_festival_id"
    )
    op.alter_column(
        "festival_runs",
        "festival_edition_id",
        new_column_name="festival_id",
        existing_type=sa.Integer(),
        existing_nullable=False,
    )

    op.drop_constraint(
        "festival_editions_festival_series_id_fkey",
        "festival_editions",
        type_="foreignkey",
    )
    op.drop_index(
        op.f("ix_festival_editions_festival_series_id"),
        table_name="festival_editions",
    )
    op.execute(
        "ALTER INDEX ix_festival_editions_slug RENAME TO ix_festivals_slug"
    )
    op.execute(
        "ALTER SEQUENCE festival_editions_id_seq RENAME TO festivals_id_seq"
    )
    op.execute(
        "ALTER TABLE festival_editions "
        "RENAME CONSTRAINT festival_editions_pkey TO festivals_pkey"
    )
    op.rename_table("festival_editions", "festivals")
    op.drop_column("festivals", "updated_at")
    op.drop_column("festivals", "created_at")
    op.drop_column("festivals", "year")
    op.drop_column("festivals", "festival_series_id")

    op.drop_index(op.f("ix_festival_series_slug"), table_name="festival_series")
    op.drop_table("festival_series")
