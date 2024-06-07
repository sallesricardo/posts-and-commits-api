FROM node:20.14-alpine

RUN apk add --update --no-cache --virtual \
    builds-deps build-base \
    make gcc g++ python3 tzdata yarn

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

CMD yarn start
