# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the logger.js file to the container
COPY logger.js .

# Install dependencies (if any)
RUN npm init -y

# Run the logger script
CMD ["node", "logger.js"]
