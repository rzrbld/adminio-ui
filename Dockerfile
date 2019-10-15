FROM node:12.2.0 as build

LABEL maintainer="rzrbld <razblade@gmail.com>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN \
    git clone https://github.com/rzrbld/adminio-ui && \
    cd adminio-ui && \
    npm install -g @angular/cli@8.3.8 && npm install
    
RUN cd /app/adminio-ui && ng build --output-path=dist



FROM nginx:1.16.0-alpine

COPY --from=build /app/adminio-ui/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
