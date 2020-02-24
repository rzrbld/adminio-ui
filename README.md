# Adminio-ui
This is a Web UI for [minio](https://min.io) s3 server.
Web UI works on top of REST API - [adminio-API](https://github.com/rzrbld/adminio-api)
Build with [Angular](https://angular.io) and [mdbootstrap](https://mdbootstrap.com)

![screenshot1](https://raw.githubusercontent.com/rzrbld/adminio-ui/master/images/image.gif)

### Web UI abilities:
| Kind   |      Create      |  List  | Update | Delete |
|--------------|:-----------------------|:-----------:|:-----------:|:-----------:|
| Bucket |  V  | V | add/remove events | V |
| User | V | V | update password, change policy | V |
| Policy |  V | V | V | V |
| Group |  V | V | add users to group, remove users, change ploicy | X |


### Extra features:
- create multiple buckets at once
- fully editable policy constructor
- copy policies


### Run full stack demo

`` docker-compose -f docker-compose.yml up ``

it will bring up:

 - minio server on 9000 port
 - adminio API on 8080 port
 - adminio UI on 80 port

after that you can go to `` http://localhost `` and try out

### Run in docker
Before running make sure that you minio server and adminio-api is started.

`` docker run rzrbld/adminio-ui:latest ``

This example run only for test purposes, unless you running UI and API of adminio on the same server.

### Run in real environment
#### Docker
In real life cases you'll need to change two environment variables at `` Dockerfile `` - `` API_BASE_URL `` which points to [adminio-api](https://github.com/rzrbld/adminio-api) REST endpoint and `` ADMINIO_PROD `` which can be set to `` true `` or `` false ``. And then rebuild a docker image.

#### npm build
Method that described above also works if you build with `` npm run build ``.
In this case example command will be look like this ``$ export API_BASE_URL=http://example.com:8099 && export ADMINIO_PROD=false && npm run build `` after that distributive can be obtained at `` ./dist `` folder.

#### ng build
If you build project with `` ng build `` you will need to set [adminio-api](https://github.com/rzrbld/adminio-api) REST endpoint at `` apiBaseUrl `` variable in file `` src/environments/environment.ts `` or `` src/environments/environment.prod.ts ``.

by default `` apiBaseUrl variable `` is set to `` http://localhost:8080 ``.

### Developement
#### npm start
in this case example command will be look like this - ``$ export API_BASE_URL=http://example.com:8099 && export ADMINIO_PROD=false && npm start `` it will bring up a dev server on port 4201. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.

#### ng serve
you will need to set [adminio-api](https://github.com/rzrbld/adminio-api) REST endpoint at `` apiBaseUrl `` variable in file `` src/environments/environment.ts `` or `` src/environments/environment.prod.ts `` then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Default angular README

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
