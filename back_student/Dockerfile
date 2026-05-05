FROM node:11-alpine
RUN addgroup -S service-web && adduser -S service-web -G service-web
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN chown -R service-web:service-web /usr/src/app
USER service-web
EXPOSE 3000
CMD ["yarn", "migration:start"]
CMD ["yarn", "start"]
