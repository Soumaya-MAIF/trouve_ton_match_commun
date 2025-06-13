FROM node:18-alpine AS builder

USER root

WORKDIR /home/node/app

COPY package*.json ./


# Copie le code source du frontend
COPY src/main/js/ .


RUN npm install

COPY --chown=node:node . .

RUN npm run build

FROM nginx:1.27

WORKDIR /usr/share/nginx/html

COPY --from=builder /home/node/app/build .

EXPOSE 80:80