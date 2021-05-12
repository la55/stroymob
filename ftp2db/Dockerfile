FROM node:alpine

# Set working directory
WORKDIR /usr/app

COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY ./ ./

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
# USER node

# Launch json-server
CMD ["node", "src/start.js"]
