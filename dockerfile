FROM node:lts

# Set timezone
RUN apt-get update ;\
    apt-get install -y tzdata

 # Create app directory
RUN mkdir -p /usr/src/dicecord
WORKDIR /usr/src/dicecord
 
# Install app dependencies
COPY package.json /usr/src/dicecord/
RUN npm install
 
# Bundle app source
COPY . /usr/src/dicecord

CMD "node dicecord.js --test"