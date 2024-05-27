FROM node:14 as build

#FROM 099199746132.dkr.ecr.eu-west-1.amazonaws.com/node-image-for-using-in-dockerfile:latest

WORKDIR /usr/src/app

RUN npm install

RUN npm install express

RUN npm install cors

COPY package*.json ./

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
