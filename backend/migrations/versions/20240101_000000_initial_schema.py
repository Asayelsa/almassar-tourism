"""Initial schema with all models.

Revision ID: 001
Revises:
Create Date: 2024-01-01 00:00:00.000000

This migration creates the initial database schema including:
- users: Authentication and user management
- contact_submissions: Contact form submissions with status tracking
- newsletter_subscribers: Newsletter subscription management
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create all tables."""

    # ==========================================================================
    # Create ENUM types first (before any tables reference them)
    # ==========================================================================
    op.execute("CREATE TYPE contact_status AS ENUM ('new', 'read', 'replied', 'archived')")
    op.execute("CREATE TYPE subscription_source AS ENUM ('website', 'footer', 'popup', 'checkout', 'import')")


    # ==========================================================================
    # Create contact_submissions table
    # ==========================================================================
    op.create_table(
        "contact_submissions",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("company", sa.String(length=255), nullable=True),
        sa.Column("subject", sa.String(length=500), nullable=True),
        sa.Column(
            "status",
            postgresql.ENUM("new", "read", "replied", "archived", name="contact_status", create_type=False),
            nullable=False,
            server_default="new",
        ),
        sa.Column("ip_address", sa.String(length=45), nullable=True),
        sa.Column("user_agent", sa.String(length=500), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_contact_submissions")),
    )

    # Contact submissions indexes
    op.create_index(
        "ix_contact_submissions_status_created",
        "contact_submissions",
        ["status", "created_at"],
        unique=False,
    )
    op.create_index(
        "ix_contact_submissions_email",
        "contact_submissions",
        ["email"],
        unique=False,
    )

    # ==========================================================================
    # Create newsletter_subscribers table
    # ==========================================================================
    op.create_table(
        "newsletter_subscribers",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column(
            "source",
            postgresql.ENUM("website", "footer", "popup", "checkout", "import", name="subscription_source", create_type=False),
            nullable=False,
            server_default="website",
        ),
        sa.Column(
            "subscribed_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column("unsubscribed_at", sa.DateTime(), nullable=True),
        sa.Column("ip_address", sa.String(length=45), nullable=True),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_newsletter_subscribers")),
    )

    # Newsletter subscribers indexes
    op.create_index(
        op.f("ix_newsletter_subscribers_email"),
        "newsletter_subscribers",
        ["email"],
        unique=True,
    )
    op.create_index(
        "ix_newsletter_subscribers_active_email",
        "newsletter_subscribers",
        ["is_active", "email"],
        unique=False,
    )


def downgrade() -> None:
    """Drop all tables."""

    # Drop newsletter_subscribers
    op.drop_index(
        "ix_newsletter_subscribers_active_email",
        table_name="newsletter_subscribers",
    )
    op.drop_index(
        op.f("ix_newsletter_subscribers_email"),
        table_name="newsletter_subscribers",
    )
    op.drop_table("newsletter_subscribers")

    # Drop contact_submissions
    op.drop_index(
        "ix_contact_submissions_email",
        table_name="contact_submissions",
    )
    op.drop_index(
        "ix_contact_submissions_status_created",
        table_name="contact_submissions",
    )
    op.drop_table("contact_submissions")


    # Drop ENUM types
    op.execute("DROP TYPE IF EXISTS subscription_source")
    op.execute("DROP TYPE IF EXISTS contact_status")
