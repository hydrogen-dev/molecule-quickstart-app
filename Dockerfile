FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./


RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
