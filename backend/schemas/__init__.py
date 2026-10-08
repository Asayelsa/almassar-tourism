"""Pydantic schemas for request/response validation."""

from .base import (
    BaseSchema,
    TimestampSchema,
    UUIDSchema,
    PaginationParams,
    PaginatedResponse,
    MessageResponse,
    ErrorResponse,
)
from .contact import (
    ContactSubmissionCreate,
    ContactSubmissionResponse,
    ContactSubmissionUpdate,
    ContactSubmissionListResponse,
    NewsletterSubscribeRequest,
    NewsletterUnsubscribeRequest,
    NewsletterSubscriberResponse,
    NewsletterSubscriberListResponse,
)

__all__ = [
    # Base
    "BaseSchema",
    "TimestampSchema",
    "UUIDSchema",
    "PaginationParams",
    "PaginatedResponse",
    "MessageResponse",
    "ErrorResponse",
    # Contact
    "ContactSubmissionCreate",
    "ContactSubmissionResponse",
    "ContactSubmissionUpdate",
    "ContactSubmissionListResponse",
    "NewsletterSubscribeRequest",
    "NewsletterUnsubscribeRequest",
    "NewsletterSubscriberResponse",
    "NewsletterSubscriberListResponse",
]
