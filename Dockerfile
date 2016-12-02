FROM node:7.2

ADD ./app /app

WORKDIR /app
RUN rm -rf node_modules
RUN npm cache clean
RUN npm install

CMD ["node", "bot.js"]