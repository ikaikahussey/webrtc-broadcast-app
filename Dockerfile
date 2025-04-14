FROM node:18

WORKDIR /app

# Copy all files (must include client and server folders)
COPY . .

# Install dependencies
RUN npm install --prefix client
RUN npm install --prefix server

# Build the React frontend
RUN npm run build --prefix client

# Set the working directory for server
WORKDIR /app

# Expose the port
EXPOSE 3000

# Start the backend server
CMD ["node", "server/server.js"]