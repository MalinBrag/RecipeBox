FROM node:18-alpine as build

WORKDIR /malins-recipe-box

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build --configuration=production

FROM nginx:alpine

COPY --from=build /malins-recipe-box/dist/malins-recipe-box/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


