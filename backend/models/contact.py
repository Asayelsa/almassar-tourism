"""Contact and Newsletter models."""

from datetime import datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import String, Boolean, Text, Index
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import ENUM
import enum

from database import Base, TimestampMixin, UUIDMixin


class ContactStatus(str, enum.Enum):
    """Status of a contact submission."""

    NEW = "new"
    READ = "read"
    REPLIED = "replied"
    ARCHIVED = "archived"

    def __str__(self) -> str:
        return self.value


# PostgreSQL ENUM type (must match migration)
contact_status_enum = ENUM(
    "new", "read", "replied", "archived",
    name="contact_status",
    create_type=False,
)


class ContactAreaOfInterest(str, enum.Enum):
    """Area of interest selected on the contact form."""

    TRAVEL_EXPERIENCES = "travel_experiences"
    CORPORATE_TRAVEL_EVENTS = "corporate_travel_events"
    TOURISM_INVESTMENT_ADVISORY = "tourism_investment_advisory"
    PARTNERSHIP = "partnership"
    OTHER = "other"

    def __str__(self) -> str:
        return self.value


# PostgreSQL ENUM type (must match migration)
contact_area_of_interest_enum = ENUM(
    "travel_experiences", "corporate_travel_events", "tourism_investment_advisory", "partnership", "other",
    name="contact_area_of_interest",
    create_type=False,
)


class ContactSubmission(UUIDMixin, TimestampMixin, Base):
    """
    Contact form submission model.

    Stores inquiries from the contact form with status tracking.

    Attributes:
        id: Unique identifier (UUID)
        name: Sender's name
        email: Sender's email address
        company: Sender's company (optional)
        subject: Message subject (optional)
        phone: Sender's phone number (optional)
        country: Sender's country (optional)
        area_of_interest: Area of interest selected on the form (optional)
        message: The message content
        status: Current status (new, read, replied, archived)
        ip_address: Sender's IP address for spam prevention
        user_agent: Browser user agent for analytics
        notes: Internal notes about this submission
        created_at: When the submission was received
        updated_at: When the submission was last modified
    """

    __tablename__ = "contact_submissions"

    # Indexes for common queries
    __table_args__ = (
        Index("ix_contact_submissions_status_created", "status", "created_at"),
        Index("ix_contact_submissions_email", "email"),
    )

    # Required fields
    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # Optional fields
    company: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,
    )
    subject: Mapped[Optional[str]] = mapped_column(
        String(500),
        nullable=True,
    )
    phone: Mapped[Optional[str]] = mapped_column(
        String(50),
        nullable=True,
    )
    country: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,
    )
    area_of_interest: Mapped[Optional[str]] = mapped_column(
        contact_area_of_interest_enum,
        nullable=True,
    )

    # Status tracking
    status: Mapped[str] = mapped_column(
        contact_status_enum,
        default="new",
        server_default="new",
        nullable=False,
    )

    # Metadata
    ip_address: Mapped[Optional[str]] = mapped_column(
        String(45),  # IPv6 max length
        nullable=True,
    )
    user_agent: Mapped[Optional[str]] = mapped_column(
        String(500),
        nullable=True,
    )
    notes: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    def __repr__(self) -> str:
        return f"<ContactSubmission {self.email} - {self.status.value}>"

    @property
    def is_unread(self) -> bool:
        """Check if submission is unread."""
        return self.status == ContactStatus.NEW


class SubscriptionSource(str, enum.Enum):
    """Source of newsletter subscription."""

    WEBSITE = "website"
    FOOTER = "footer"
    POPUP = "popup"
    CHECKOUT = "checkout"
    IMPORT = "import"

    def __str__(self) -> str:
        return self.value


# PostgreSQL ENUM type (must match migration)
subscription_source_enum = ENUM(
    "website", "footer", "popup", "checkout", "import",
    name="subscription_source",
    create_type=False,
)


class NewsletterSubscriber(UUIDMixin, Base):
    """
    Newsletter subscriber model.

    Tracks email subscriptions with proper unsubscribe handling.

    Attributes:
        id: Unique identifier (UUID)
        email: Subscriber's email address (unique)
        is_active: Whether subscription is active
        source: Where the subscription came from
        subscribed_at: When they subscribed
        unsubscribed_at: When they unsubscribed (if applicable)
        ip_address: IP address at subscription time
    """

    __tablename__ = "newsletter_subscribers"

    # Indexes
    __table_args__ = (
        Index("ix_newsletter_subscribers_active_email", "is_active", "email"),
    )

    # Fields
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )
    source: Mapped[str] = mapped_column(
        subscription_source_enum,
        default="website",
        server_default="website",
        nullable=False,
    )
    subscribed_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        nullable=False,
    )
    unsubscribed_at: Mapped[Optional[datetime]] = mapped_column(
        nullable=True,
    )
    ip_address: Mapped[Optional[str]] = mapped_column(
        String(45),
        nullable=True,
    )

    def __repr__(self) -> str:
        status = "active" if self.is_active else "unsubscribed"
        return f"<NewsletterSubscriber {self.email} ({status})>"

    def unsubscribe(self) -> None:
        """Mark subscriber as unsubscribed."""
        self.is_active = False
        self.unsubscribed_at = datetime.utcnow()

    def resubscribe(self) -> None:
        """Reactivate subscription."""
        self.is_active = True
        self.unsubscribed_at = None
