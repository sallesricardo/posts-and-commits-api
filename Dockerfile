FROM node:20.14-alpine

RUN apk add --update --no-cache --virtual \
    builds-deps build-base \
    make gcc g++ python3 tzdata yarn

RUN cp /usr/share/zoneinfo/Brazil/East /etc/localtime
RUN echo "Brazil/East" > /etc/timezone

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

CMD yarn start
