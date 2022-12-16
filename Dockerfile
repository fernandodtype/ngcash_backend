# syntax=docker/dockerfile:1
FROM node:18-alpine as development

WORKDIR /build
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /build

COPY package*.json .

RUN npm install --only=production

COPY --from=development /build/build ./build

CMD ["node", "build/src/index.js"]