FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build

RUN npm install -g json-server

EXPOSE 3000

CMD ["/bin/sh", "/app/start.sh"]
