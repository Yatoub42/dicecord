FROM node:lts
 
 # Set variables
ENV INSTANCE=test

 # Create app directory
RUN mkdir -p /usr/src/dicecord
WORKDIR /usr/src/dicecord
 
# Install app dependencies
COPY package.json /usr/src/dicecord/
RUN npm install

# Create db directory
#RUN mkdir -p /usr/src/dicecord/db
 
# Bundle app source
COPY . /usr/src/dicecord

# Host shared volume
#VOLUME /root/dicecord/db /usr/src/dicecord/db
#VOLUME /usr/src/dicecord/db:/root/dicecord/db

CMD "/usr/bin/node dicecord.js --$INSTANCE"