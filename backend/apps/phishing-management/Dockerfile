FROM node:18 As development

WORKDIR /usr/src/app

COPY /backend/package*.json ./

RUN npm install

COPY /backend .

RUN npm run build phishing-management

