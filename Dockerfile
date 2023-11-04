# Use the official Node.js 16 image based on Debian 11 (Bullseye) slim
FROM node:18-bullseye-slim

# Set the working directory in the container
WORKDIR /app

# Install wget
RUN apt update && apt install wget imagemagick -y

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

RUN wget https://files.ivanch.me/api/public/dl/a8pf5HZL/small-image.png && \
    wget https://files.ivanch.me/api/public/dl/ZoZDck7M/big-image.png && \
    wget https://files.ivanch.me/api/public/dl/URuFVrtX/video.mp4 && \
    wget https://files.ivanch.me/api/public/dl/aeZqpr_F/nginx.html && \
    mkdir -p ./static && \
    mv small-image.png ./static && \
    mv big-image.png ./static && \
    mv video.mp4 ./static && \
    mv nginx.html ./static

# Copy the rest of the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]