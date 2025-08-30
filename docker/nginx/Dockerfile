FROM nginx:1.27-alpine

RUN apk add --no-cache bash

COPY default.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

