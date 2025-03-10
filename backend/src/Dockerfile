# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /backend/src

# Copy package.json and package-lock.json before running npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Ensure the necessary permissions
RUN chmod -R 777 /backend/src

# Expose the port your app runs on
EXPOSE 5200

# Use npx to run ts-node
CMD [ "npx", "ts-node", "server.ts" ]
