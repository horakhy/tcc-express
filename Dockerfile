# Use the official Node.js 16 image based on Debian 11 (Bullseye) slim
FROM node:18-bullseye-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

RUN wget https://files.ivanch.me/api/public/dl/iFuXSNhw/small-image.png && \
    wget https://files.ivanch.me/api/public/dl/81Bkht5C/big-image.png && \
    wget https://files.ivanch.me/api/public/dl/nAndfAjK/video.mp4 && \
    mkdir -p ./static && \
    mv small-image.png ./static && \
    mv big-image.png ./static && \
    mv video.mp4 ./static

# Copy the rest of the application source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]