FROM node:16.14-alpine

WORKDIR /CT_ngBackDev

COPY package* .

RUN yarn install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "yarn" ]
CMD ["dev"]

