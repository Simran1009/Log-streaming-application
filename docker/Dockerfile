# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files (including backend, frontend, and logger.js)
COPY . .

# Expose the port that your application will run on
EXPOSE 3002

# Run the server (adjust if your entry file is different)
CMD ["node", "server.js"]

