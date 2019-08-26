FROM node:lts

# Set timezone
RUN echo "Europe/Paris" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

 # Create app directory
RUN mkdir -p /usr/src/dicecord
WORKDIR /usr/src/dicecord
 
# Install app dependencies
COPY package.json /usr/src/dicecord/
RUN npm install
 
# Bundle app source
COPY . /usr/src/dicecord

CMD "node dicecord.js --test"