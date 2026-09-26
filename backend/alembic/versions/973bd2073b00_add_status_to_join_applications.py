"""add status to join applications

Revision ID: 973bd2073b00
Revises: 8c8506756181
Create Date: 2026-09-26 16:08:00.122643

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "973bd2073b00"
down_revision: Union[str, Sequence[str], None] = "8c8506756181"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add status column to join_applications."""

    op.add_column(
        "join_applications",
        sa.Column(
            "status",
            sa.String(length=50),
            nullable=False,
            server_default="pending",
        ),
    )

    op.create_index(
        op.f("ix_join_applications_status"),
        "join_applications",
        ["status"],
        unique=False,
    )


def downgrade() -> None:
    """Remove status column from join_applications."""

    op.drop_index(
        op.f("ix_join_applications_status"),
        table_name="join_applications",
    )

    op.drop_column(
        "join_applications",
        "status",
    )