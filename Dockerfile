
# Minimal Dockerfile for monorepo
FROM node:20-alpine3.22 AS buildenv
WORKDIR /app
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
RUN npm install && npm audit fix --force

# Copy all monorepo packages needed for backend compilation
COPY packages/ ./packages/
COPY apps/backend/tsconfig.json ./apps/backend/tsconfig.json
COPY apps/backend/src/ ./apps/backend/src/

# Build backend explicitly
RUN npx tsc -p apps/backend/tsconfig.json
RUN ls -la /app/apps/backend/dist/ || true

FROM node:20-alpine3.22 AS production
WORKDIR /app

# Copy package files
COPY --from=buildenv /app/package*.json ./

# Copy dependencies  
COPY --from=buildenv /app/node_modules/ ./node_modules/

# Copy compiled backend code (THIS IS CRUCIAL)
COPY --from=buildenv /app/apps/backend/dist ./apps/backend/dist

CMD ["node", "apps/backend/dist/apps/backend/src/server.js"]
