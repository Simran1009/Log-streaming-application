# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files (including the backend and logger.js)
COPY . .

# Expose the port that your application will run on
EXPOSE 4000

# Run the server (adjust the path if server.js is in a subfolder)
CMD ["node", "backend/server.js"]  # Update the path based on where your server.js is located
