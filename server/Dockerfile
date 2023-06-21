# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the source code to the container
COPY . .

# Expose the container port
EXPOSE 3001

# Define the command to start the application
CMD ["npm", "start"]
