FROM node:lts

# Set variables
ENV INSTANCE=test

# Set timezone
RUN export DEBIAN_FRONTEND=noninteractive; \
    export DEBCONF_NONINTERACTIVE_SEEN=true; \
    echo 'tzdata tzdata/Areas select Europe' | debconf-set-selections; \
    echo 'tzdata tzdata/Zones/Etc select Paris' | debconf-set-selections; \
    apt-get update -qqy \
 && apt-get install -qqy --no-install-recommends \
        tzdata \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

 # Create app directory
RUN mkdir -p /usr/src/dicecord
WORKDIR /usr/src/dicecord
 
# Install app dependencies
COPY package.json /usr/src/dicecord/
RUN npm install
 
# Bundle app source
COPY . /usr/src/dicecord

CMD "node dicecord.js --$INSTANCE"