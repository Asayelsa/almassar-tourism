"""Alembic environment configuration for database migrations."""

import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool

from alembic import context

# Add the parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import all models to ensure they are registered with Base.metadata
from database import Base, metadata
from models.contact import ContactSubmission, NewsletterSubscriber

# This is the Alembic Config object
config = context.config

# Interpret the config file for Python logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Model's MetaData object for 'autogenerate' support
# Using the metadata with naming convention from database.py
target_metadata = Base.metadata


def get_database_url() -> str:
    """Get database URL from environment, converting async URL to sync."""
    url = os.getenv(
        "DATABASE_URL",
        "postgresql://app_user:password@localhost:5432/app_db"
    )
    # Convert async URL to sync for Alembic
    return url.replace("+asyncpg", "").replace("+aiosqlite", "")


# Set the database URL
config.set_main_option("sqlalchemy.url", get_database_url())


def include_object(object, name, type_, reflected, compare_to):
    """
    Filter objects for autogenerate.

    Can be used to exclude certain tables or objects from migrations.
    """
    # Include all objects by default
    return True


def run_migrations_offline() -> None:
    """
    Run migrations in 'offline' mode.

    This configures the context with just a URL and not an Engine,
    though an Engine is acceptable here as well. By skipping the Engine
    creation we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
        compare_server_default=True,
        include_object=include_object,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """
    Run migrations in 'online' mode.

    In this scenario we need to create an Engine and associate a
    connection with the context.
    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
            include_object=include_object,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
