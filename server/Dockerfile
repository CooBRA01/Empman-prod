# Use an official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the desired port (e.g., 3001)
EXPOSE 3001

# Set the command to run the API
CMD ["npm", "start"]
