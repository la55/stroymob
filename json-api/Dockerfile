FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install json-server
RUN npm install --global json-server

# Expose the listening port
EXPOSE 5000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch json-server
CMD ["json-server", "DB/db.json", "--port", "5000", "--host", "0.0.0.0", "--read-only", "--routes=api/routes.json", "--middlewares=api/middle.js" ]
