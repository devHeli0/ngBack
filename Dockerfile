FROM node:16-alpine

WORKDIR /NG_APP/ngBackDev

COPY . /NG_APP/ngBackDev

VOLUME [ "./ngBackDev/package.json", "/NG_APP/ngBackDev" ] 

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]

