FROM node:20-alpine AS build

WORKDIR /app

COPY /frontend/package*.json ./

RUN npm install --legacy-peer-deps

COPY /frontend .

RUN npm run build

FROM nginx:alpine AS production

COPY /frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
