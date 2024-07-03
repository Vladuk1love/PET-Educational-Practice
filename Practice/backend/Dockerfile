FROM node:20.9.0-alpine
LABEL authors="vlady"

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn

COPY . .

CMD ["yarn","run","start:dev"]
