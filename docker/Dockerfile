# Stage 1: Build the app
FROM node:16 as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Stage 2: Copy only necessary files to production
FROM node:16

WORKDIR /usr/src/app

# Set environment variable
ENV NODE_ENV=production

COPY --from=builder /usr/src/app .

# Expose the port
EXPOSE 4000

# Use exec form for CMD
CMD ["node", "backend/server.js"]
