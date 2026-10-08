"""Configuration management using Pydantic settings."""

import os
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings with environment variable support."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Environment
    env: str = "development"
    debug: bool = True

    # Database
    database_url: str = "postgresql+asyncpg://app_user:password@localhost:5432/app_db"
    db_pool_size: int = 5
    db_max_overflow: int = 10


    # Application
    site_name: str = "42d6f3fc-6853-4abf-a5bf-9e132af66c77"
    cors_origins: str = "http://localhost:3000"
    frontend_url: str = "http://localhost:3000"


    @property
    def cors_origins_list(self) -> list[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        """Check if running in production."""
        return self.env.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


# Global settings instance
settings = get_settings()
