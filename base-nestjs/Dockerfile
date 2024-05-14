# SELECT base docker images
FROM node:14-alpine AS dev

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install required packages
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install glob rimraf

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

FROM node:14-alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main"]
