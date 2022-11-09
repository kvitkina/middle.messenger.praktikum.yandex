FROM node:latest
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./dist ./dist
COPY ./server.js server.js
EXPOSE 3000
CMD node server.js
