# Adminio-ui
This is a Web UI for [minio](https://min.io) s3 server. 
Web UI works on top of REST API - [adminio-API](https://github.com/rzrbld/adminio-api) 
Build with [Angular](https://angular.io) and [mdbootstrap](https://mdbootstrap.com)

### Web UI abilities:
| Kind   |      Create      |  List  | Update | Delete |
|--------------|:-----------------------|:-----------:|:-----------:|:-----------:|
| Bucket |  :heavy_check_mark:  | :heavy_check_mark: | :x: | :heavy_check_mark: |
| User |  :heavy_check_mark:  | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Policy |  :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Group |  :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x: |


### Extra features:
- create multiple buckets at once
- full editable policy constructor
- copy policies


### Run full stack demo

`` docker-compose -f docker-compose.yml up ``

it will bring up:

 -  minio server on 9000 port 
 - adminio API on 8080 port
 - adminio UI on 80 port

after that you can go to `` http://localhost `` and try out

### Run in docker
Before running make sure that you minio server and adminio-api is started.

`` docker run rzrbld/adminio-ui:0.2.1 ``

This example run only for test purposes, unless you running UI and API of adminio on the same server.

In real life cases you'll need to change a `` baseUrl `` variable `` on line 12 `` in file `` src/app/api.service.ts ``
by default `` baseUrl variable `` is set to `` http://localhost:8080 ``. And then rebuild a docker image.

## screenshot
![screenshot1](https://raw.githubusercontent.com/rzrbld/adminio-ui/master/images/screenshot1.png)

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
