# adminio-ui
This is a Web UI for [minio](https://min.io) s3 server. 
Web UI works on top of rest API - [adminio-API](https://github.com/rzrbld/adminio-api) 

## run in docker
Before running make sure that you minio server and adminio-api is started.
`` docker run rzrbld/adminio-ui:0.2 ``
this run only for test purposes, unless you running UI and API of adminio on the same server.
in real life cases you'll need to change a `` baseUrl `` variable `` on line 12 `` in file `` src/app/api.service.ts ``
by default `` baseUrl varible `` is set to `` http://localhost:8080 ``

![screenshot1](https://raw.githubusercontent.com/rzrbld/adminio-ui/master/images/screenshot1.png)

## Default angular README 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
