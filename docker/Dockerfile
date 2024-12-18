# Step 1: Build the frontend
FROM node:16 AS frontend-build
WORKDIR /app/frontend

# Install dependencies and build the React app
COPY frontend/package.json frontend/package-lock.json ./ 
RUN npm install
COPY frontend/ . 
RUN npm run build

# Step 2: Set up the backend
FROM node:16
WORKDIR /app/backend

# Install backend dependencies
COPY backend/package.json backend/package-lock.json ./ 
RUN npm install

# Copy backend source code
COPY backend/ .

# Copy the built frontend from the first stage into the backend 'public' folder
COPY --from=frontend-build /app/frontend/build /app/backend/public

# Expose port 4000 for the backend
EXPOSE 80

# Set environment variable (optional but recommended)
ENV PORT=80

# Start the backend server
CMD ["node", "server.js"]

