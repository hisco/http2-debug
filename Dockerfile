FROM node:8.11.2-alpine

WORKDIR /usr/src/app
COPY . .

EXPOSE 8443
CMD [ "npm", "start" ]