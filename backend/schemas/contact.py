"""Contact and Newsletter schemas."""

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import EmailStr, Field, field_validator

from models.contact import ContactAreaOfInterest, ContactStatus, SubscriptionSource
from .base import BaseSchema, TimestampSchema, UUIDSchema


# =============================================================================
# Contact Submission Schemas
# =============================================================================


class ContactSubmissionCreate(BaseSchema):
    """Schema for creating a contact submission."""

    name: str = Field(
        ...,
        min_length=2,
        max_length=255,
        description="Sender's name",
    )
    email: EmailStr = Field(..., description="Sender's email address")
    message: str = Field(
        ...,
        min_length=10,
        max_length=5000,
        description="Message content",
    )
    company: Optional[str] = Field(
        None,
        max_length=255,
        description="Sender's company (optional)",
    )
    subject: Optional[str] = Field(
        None,
        max_length=500,
        description="Message subject (optional)",
    )
    phone: Optional[str] = Field(
        None,
        max_length=50,
        description="Sender's phone number (optional)",
    )
    country: Optional[str] = Field(
        None,
        max_length=255,
        description="Sender's country (optional)",
    )
    area_of_interest: Optional[ContactAreaOfInterest] = Field(
        None,
        description="Area of interest selected on the contact form (optional)",
    )

    @field_validator("name", "message")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        """Strip leading/trailing whitespace."""
        return v.strip()


class ContactSubmissionResponse(UUIDSchema, TimestampSchema):
    """Schema for contact submission response."""

    name: str
    email: EmailStr
    message: str
    company: Optional[str] = None
    subject: Optional[str] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    area_of_interest: Optional[ContactAreaOfInterest] = None
    status: ContactStatus
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    notes: Optional[str] = None


class ContactSubmissionUpdate(BaseSchema):
    """Schema for updating contact submission (admin)."""

    status: Optional[ContactStatus] = None
    notes: Optional[str] = Field(None, max_length=2000)


class ContactSubmissionListResponse(UUIDSchema):
    """Schema for contact submission in list views."""

    name: str
    email: EmailStr
    subject: Optional[str] = None
    status: ContactStatus
    created_at: datetime

    @property
    def is_unread(self) -> bool:
        """Check if submission is unread."""
        return self.status == ContactStatus.NEW


# =============================================================================
# Newsletter Schemas
# =============================================================================


class NewsletterSubscribeRequest(BaseSchema):
    """Schema for newsletter subscription request."""

    email: EmailStr = Field(..., description="Email address to subscribe")
    source: SubscriptionSource = Field(
        default=SubscriptionSource.WEBSITE,
        description="Subscription source",
    )


class NewsletterUnsubscribeRequest(BaseSchema):
    """Schema for newsletter unsubscription."""

    email: EmailStr = Field(..., description="Email address to unsubscribe")


class NewsletterSubscriberResponse(UUIDSchema):
    """Schema for newsletter subscriber response."""

    email: EmailStr
    is_active: bool
    source: SubscriptionSource
    subscribed_at: datetime
    unsubscribed_at: Optional[datetime] = None


class NewsletterSubscriberListResponse(UUIDSchema):
    """Schema for subscriber in list views."""

    email: EmailStr
    is_active: bool
    source: SubscriptionSource
    subscribed_at: datetime
