############################################################
# Dockerfile to build Python WSGI Application Containers
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM node:boron

# Copy app source
COPY . /src

# Set work directory to /src
WORKDIR /src

# Install app dependencies
RUN npm install

#Expose port to outside world
EXPOSE 3000

#start command as per package.json
CMD [ "npm", "start" ]








