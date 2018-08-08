FROM node

WORKDIR /app

COPY app/package.json /app/package.json

RUN npm install

COPY app /app

CMD npm start