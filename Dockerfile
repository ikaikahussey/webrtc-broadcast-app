# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN cd client && npm install && cd ../server && npm install

# Copy rest of the app
COPY . .

# Build frontend
RUN cd client && npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server/server.js"]
