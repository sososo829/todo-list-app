# Stage 1: Development environment
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port for Vite's dev server
EXPOSE 5173

# Set the command to run the Vite dev server
CMD ["npm", "run", "dev"]
