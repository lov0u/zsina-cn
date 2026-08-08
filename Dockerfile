# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for TypeScript build)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Runner stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --g 1001 --system nextjs && \
    adduser --u 1001 --system nextjs -G nextjs

# Copy build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set user
USER nextjs

# Expose port
EXPOSE 3000

# Set hostname
ENV HOSTNAME "0.0.0.0"
ENV PORT 3000

# Start command
CMD ["node", "server.js"]
