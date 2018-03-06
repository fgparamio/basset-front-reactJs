# Node
FROM node:carbon

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
COPY . .
# Install `serve` to run the application.
RUN npm install -g serve
# Install app dependencies
RUN npm install
# Build for production.
RUN npm run build --production

# Set the command to start the node server.
CMD serve -s build
# Expose Server Port
EXPOSE 5000
