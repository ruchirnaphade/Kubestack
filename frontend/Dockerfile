FROM node:alpine

WORKDIR /frontend/src/app

COPY . /frontend/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
