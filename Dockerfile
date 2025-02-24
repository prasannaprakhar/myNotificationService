# Use official Node.js LTS image as base
FROM node:18-alpine AS builder

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the application port (change if needed)
EXPOSE 6000

# Start the application
CMD ["node", "index.js"]