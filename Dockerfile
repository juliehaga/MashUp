############################################################
# Dockerfile to build Python WSGI Application Containers
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER Julie Haga


# Install Node.js
RUN apt-get update
RUN apt-get install -y curl
RUN apt install -y curl software-properties-common gnupg
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]








