FROM node:16-alpine3.15

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5560

CMD [ "npm", "start" ]