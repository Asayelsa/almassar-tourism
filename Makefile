.PHONY: up up-d down logs logs-frontend logs-backend logs-db rebuild clean migrate migrate-create shell-backend

# Start all services
up:
	docker compose up --build

# Start in detached mode
up-d:
	docker compose up -d --build

# Stop all services
down:
	docker compose down

# View all logs
logs:
	docker compose logs -f

# View frontend logs
logs-frontend:
	docker compose logs -f frontend

# View backend logs
logs-backend:
	docker compose logs -f backend

# View database logs
logs-db:
	docker compose logs -f db

# Rebuild specific service
rebuild-%:
	docker compose up -d --build $*

# Clean up everything
clean:
	docker compose down -v --rmi local

# Run migrations
migrate:
	docker compose exec backend alembic upgrade head

# Create new migration
migrate-create:
	docker compose exec backend alembic revision --autogenerate -m "$(MSG)"

# Show migration history
migrate-history:
	docker compose exec backend alembic history

# Rollback last migration
migrate-downgrade:
	docker compose exec backend alembic downgrade -1

# Open shell in backend container
shell-backend:
	docker compose exec backend /bin/sh

# Open shell in frontend container
shell-frontend:
	docker compose exec frontend /bin/sh
