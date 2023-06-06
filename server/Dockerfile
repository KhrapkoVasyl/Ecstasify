# build

FROM node:18-alpine3.16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . . 

RUN npm run build

# run

FROM node:18-alpine3.16

RUN apk add --no-cache tini

ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app

COPY --from=build /app/*.env /app/package*.json ./

RUN npm ci --production

COPY --from=build /app/dist ./src/

CMD ["node", "./src/main.js"]
  