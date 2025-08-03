# Use the official Node.js runtime as the base image
FROM node:20-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 