FROM node:10

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY ./node_modules ./

EXPOSE 3000