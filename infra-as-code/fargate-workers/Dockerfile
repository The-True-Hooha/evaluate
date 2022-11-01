FROM --platform=linux/amd64 node:14

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start" ]