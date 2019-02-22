FROM node:alpine

RUN mkdir /data

COPY . /data

WORKDIR /data

RUN yarn

CMD ["yarn", "start"]
