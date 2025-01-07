FROM node:20.2 AS build

ARG VITE_BASE

WORKDIR /client

COPY tailwind.config.ts .

COPY postcss.config.js .

COPY package.json .

COPY tsconfig.json .

COPY tsconfig.node.json .

# RUN echo "VITE_BASE=https://api.just-ad.ru/" > .env.production

RUN npm i

COPY . .

CMD [ "npm", "run", "build" ]
