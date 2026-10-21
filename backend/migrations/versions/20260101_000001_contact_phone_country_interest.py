"""Add phone, country and area_of_interest to contact_submissions.

Revision ID: 002
Revises: 001
Create Date: 2026-01-01 00:00:01.000000

Adds the extra fields captured by the AL MASSAR contact form: phone,
country, and area_of_interest (an enum matching the form's selection list).
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add the new contact_submissions columns."""

    op.execute(
        "CREATE TYPE contact_area_of_interest AS ENUM "
        "('travel_experiences', 'corporate_travel_events', 'tourism_investment_advisory', 'partnership', 'other')"
    )

    op.add_column("contact_submissions", sa.Column("phone", sa.String(length=50), nullable=True))
    op.add_column("contact_submissions", sa.Column("country", sa.String(length=255), nullable=True))
    op.add_column(
        "contact_submissions",
        sa.Column(
            "area_of_interest",
            postgresql.ENUM(
                "travel_experiences",
                "corporate_travel_events",
                "tourism_investment_advisory",
                "partnership",
                "other",
                name="contact_area_of_interest",
                create_type=False,
            ),
            nullable=True,
        ),
    )


def downgrade() -> None:
    """Remove the added contact_submissions columns."""

    op.drop_column("contact_submissions", "area_of_interest")
    op.drop_column("contact_submissions", "country")
    op.drop_column("contact_submissions", "phone")
    op.execute("DROP TYPE IF EXISTS contact_area_of_interest")
