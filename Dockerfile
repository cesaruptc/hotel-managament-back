FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon

EXPOSE 3000
CMD ["nodemon", "index.js"]