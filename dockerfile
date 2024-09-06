FROM node:16.13.1-alpine3.14 AS development
WORKDIR /callcenter-api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.13.1-alpine3.14 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /callcenter-api
COPY package*.json ./

RUN npm install --only=prod
COPY . .
COPY --from=development /callcenter-api/dist ./dist

CMD [ "node", "dist/main" ]