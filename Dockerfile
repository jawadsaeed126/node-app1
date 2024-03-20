# FROM node:14 as build



FROM 099199746132.dkr.ecr.eu-west-1.amazonaws.com/dockerfile-node-image-repository

WORKDIR /usr/src/app

RUN npm install

RUN npm install express

COPY package*.json ./

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
