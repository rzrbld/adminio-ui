FROM node:12.2.0 as build

LABEL maintainer="rzrbld <razblade@gmail.com>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV API_BASE_URL http://localhost:8080
ENV ADMINIO_PROD false

RUN \
    git clone https://github.com/rzrbld/adminio-ui && \
    cd adminio-ui && \
    npm install -g @angular/cli@8.3.8 && npm install

RUN cd /app/adminio-ui && npm run build


FROM nginx:1.16.0-alpine

COPY --from=build /app/adminio-ui/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
