FROM node:alpine

WORKDIR /home/api

COPY ./package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3005

CMD [ "node", "./dist/server.js" ]
