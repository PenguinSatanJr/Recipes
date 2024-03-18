FROM node:19.2-alpine3.15

WORKDIR /app

COPY package.json package-lock.json tsconfig.json /app/

RUN npm ci

COPY /src /app/src

CMD npm start
