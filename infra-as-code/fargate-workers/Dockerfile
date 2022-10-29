FROM node:14

WORKDIR /src

COPY package*.json ./

RUN pwd

RUN npm install

COPY . .

CMD ["npm", "start" ]