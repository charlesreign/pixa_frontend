# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app


# install app dependencies
COPY package.json .
COPY package-lock.json .

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install

# RUN npm install serve

# production build
RUN npm run build

RUN npm install -g serve

# add app
COPY . .


EXPOSE 3000

# start app
CMD ["serve", "-s" "build"]