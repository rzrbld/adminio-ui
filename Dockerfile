FROM node:16 as build

LABEL maintainer="rzrbld <razblade@gmail.com>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN \
    git clone https://github.com/rzrbld/adminio-ui && \
    cd adminio-ui && \
    npm cache clean --force && npm install -g npm && npm install -g @angular/cli && npm install --force

RUN rm -rf adminio-ui/dist/*
RUN cd /app/adminio-ui && npm run build


FROM nginx:1.22-alpine

LABEL maintainer="rzrbld <razblade@gmail.com>"

ENV API_BASE_URL http://localhost:8080
ENV ADMINIO_PROD false
ENV ADMINIO_MULTI_BACKEND true
ENV ADMINIO_BACKENDS '[{"name":"myminio","url":"http://localhost:8080"},{"name":"local","url":"http://localhost:8081"},{"name":"not-myminio","url":"http://minio.example.com:8080"}]'
ENV NGX_ROOT_PATH /
ENV NGX_PORT 80

COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/default.template /etc/nginx/conf.d/default.template

COPY --from=build /app/adminio-ui/dist /usr/share/nginx/html

# fix run in unprivileged mode (k8s/openshift)
RUN chmod -R 777 /usr/share/nginx/html
RUN chmod -R 777 /etc/nginx/conf.d
RUN chmod -R 777 /var/cache/nginx
RUN chmod -R 777 /var/run
# end of fix

EXPOSE 80

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD [ "nginx", "-g", "daemon off;" ]
