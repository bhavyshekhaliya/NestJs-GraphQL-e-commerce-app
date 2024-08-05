# Start with the latest Node.js version
FROM node:22.3.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port the app runs on
EXPOSE 2838

# Command to run the app
CMD ["npm", "run", "start:dev"]

