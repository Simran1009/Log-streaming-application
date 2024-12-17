# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the project files (including backend and logger.js)
COPY . .

# Expose the port that your application will run on
EXPOSE 4000

# Run the server (adjusted for your file structure)
CMD ["node", "server.js"]
