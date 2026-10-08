# syntax=docker/dockerfile:1

# =============================================================================
# Dependencies — installed once, shared by both the dev and build stages.
# =============================================================================
# Previously dev and builder each ran their own npm install, doing the same
# work twice on every build. Both now derive from this stage instead.
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

# npm ci is reproducible and faster, but needs a lockfile. Templates ship
# without one until the first install, so fall back rather than fail.
# The cache mount keeps the package downloads across rebuilds.
RUN --mount=type=cache,target=/root/.npm \
    if [ -f package-lock.json ]; then npm ci; else npm install; fi

# =============================================================================
# Development — hot reload. This is the stage the preview runs.
# =============================================================================
FROM deps AS development

WORKDIR /app

COPY . .

ENV WATCHPACK_POLLING=true \
    CHOKIDAR_USEPOLLING=true \
    NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=10s --start-period=60s --retries=5 \
    CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]

# =============================================================================
# Build
# =============================================================================
FROM deps AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY . .

# `output: standalone` always emits a public/ copy step, so the directory has
# to exist even when the project ships no static assets — otherwise the COPY
# in the production stage fails and the build dies at the last step.
RUN mkdir -p public && npm run build

# =============================================================================
# Production
# =============================================================================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# HOSTNAME is not cosmetic: the standalone server binds 127.0.0.1 by default,
# which makes the container reachable from inside itself and nowhere else.

RUN addgroup -g 1001 -S appgroup \
    && adduser -S -u 1001 -G appgroup appuser

COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appgroup /app/public ./public

USER appuser

EXPOSE 3000

# node is guaranteed present, so this needs no extra package. The previous
# `apk add wget` cost a layer and a network round trip on every build.
HEALTHCHECK --interval=15s --timeout=10s --start-period=60s --retries=5 \
    CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
