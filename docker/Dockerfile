# Use Node.js 16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files (including backend folder and server.js)
COPY . .

# Expose the port your application will run on
EXPOSE 4000

# Run the server from the backend folder
CMD ["node", "backend/server.js"]
