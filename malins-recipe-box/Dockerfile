FROM node:18-alpine as build

WORKDIR /app/malin-recipe-box

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build --configuration=production

FROM nginx:alpine

COPY --from=build /app/malin-recipe-box/dist/malin-recipe-box /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


