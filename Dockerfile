# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Vue.js application (replace "npm run build" with your build command)
RUN npm run build

# Expose a port (adjust if your application uses a different port)
EXPOSE 8080

# Define the command to run the application
CMD [ "npm", "run", "start" ]
