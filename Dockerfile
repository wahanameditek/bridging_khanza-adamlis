# ------------------------------------------------------------
# Stage 1 — Build stage (compile TypeScript)
# ------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY src ./src

# Build TypeScript to JS
RUN npm run build


# ------------------------------------------------------------
# Stage 2 — Runtime stage (production image)
# ------------------------------------------------------------
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY .env ./

# Install only production dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Expose port (default 3000)
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start command
CMD ["node", "dist/server.js"]
