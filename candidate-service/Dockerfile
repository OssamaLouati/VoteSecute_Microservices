From node:16-slim

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm " , "start" ]
