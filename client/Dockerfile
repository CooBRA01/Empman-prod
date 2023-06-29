# Use an official Node.js image as the base
FROM node:14 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Build the React.js app using Vite
RUN npm run build

# Use a lightweight HTTP server to serve the built app
FROM node:14-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=builder /app/dist ./dist

# Install serve to run the app
RUN npm install -g serve

# Expose the desired port (e.g., 5173)
EXPOSE 5173

# Set the command to run the app
CMD ["serve", "-s", "dist", "-l", "5173"]
