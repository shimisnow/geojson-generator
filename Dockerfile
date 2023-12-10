FROM node:21.4.0

RUN apt-get -y update
RUN apt-get -y install git curl

WORKDIR /var

RUN git clone https://github.com/mapbox/geojson.io.git

WORKDIR /var/geojson.io/

RUN npm install
RUN npm install -g rimraf live-server
RUN npm run build