FROM node:16-alpine

WORKDIR /Gomoku-Service

ADD ./package.json ./
ADD ./package-lock.json ./
ADD ./tsconfig.json ./
ADD ./.env ./
RUN npm install

CMD npm run cleandb; npm run dev