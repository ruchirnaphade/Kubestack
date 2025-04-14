# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /backend/src

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Ensure necessary permissions (more restrictive than 777)
RUN chmod -R 755 /backend/src

# Expose the port your app runs on
EXPOSE 5200

# Install ts-node globally if it's not in package.json dependencies
RUN npm install -g ts-node

# Start the application with npx and ts-node
CMD ["npx", "ts-node", "server.ts"]

