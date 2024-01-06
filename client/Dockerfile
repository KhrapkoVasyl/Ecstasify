FROM node:20.10-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine3.18

EXPOSE 80

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/ngnix.conf /etc/nginx/conf.d/default.conf