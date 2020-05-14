FROM node:12 as build

LABEL maintainer="rzrbld <razblade@gmail.com>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV API_BASE_URL http://localhost:8080
ENV ADMINIO_PROD false
ENV ADMINIO_MULTI_BACKEND false
ENV ADMINIO_BACKENDS {"myminio":"http://localhost:8080","not-myminio":"http://minio.example.com:8080"}

RUN \
    git clone https://github.com/rzrbld/adminio-ui && \
    cd adminio-ui && \
    npm install -g @angular/cli@9.1.0 && npm install

RUN cd /app/adminio-ui && npm run build


FROM nginx:1.17-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/adminio-ui/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
