# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies separately
WORKDIR /app/client
RUN npm install

WORKDIR /app/server
RUN npm install

# Copy the full app
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/client
RUN npm run build

# Serve from backend
WORKDIR /app
EXPOSE 3000
CMD ["node", "server/server.js"]