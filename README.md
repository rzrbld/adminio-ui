# Adminio-ui
This is a Web UI for [minio](https://min.io) s3 server.
Web UI works on top of REST API - [adminio-API](https://github.com/rzrbld/adminio-api)
Build with [Angular](https://angular.io) and [mdbootstrap](https://mdbootstrap.com)

![Docker hub stats](https://img.shields.io/docker/pulls/rzrbld/adminio-ui?style=flat-square) ![GitHub License](https://img.shields.io/github/license/rzrbld/adminio-ui?style=flat-square)

![screenshot1](https://raw.githubusercontent.com/rzrbld/adminio-ui/master/images/image.gif)

### Web UI abilities:
| Kind   |      Create      |  List  | Update | Delete |
|--------------|:-----------------------|:-----------:|:-----------:|:-----------:|
| Bucket |  V  | V | add/remove events, change lifecycle, manage quota, tags, policy, encryption | V |
| User | V | V | update password, change policy | V |
| Policy |  V | V | V | V |
| Group |  V | V | add users to group, remove users, change policy | only if group is empty (has no members) |


### Extra features:
- create multiple buckets at once
- fully editable policy constructor
- copy policies
- upload and download bucket lifecycles and policies
- bucket quota

### Run full stack demo

`` docker-compose -f docker-compose.yml up ``

it will bring up:

 - minio server on 9000 port
 - adminio API on 8080 port
 - adminio UI on 80 port

after that you can go to `` http://localhost `` and try out

#### Production stack

For a production ready _demo_, please see [docker-stack.yml](docker-stack.yml) to boot up the following:

 - adminio-ui
 - adminio-api
 
Provided configuration will run the UI and the API on the same hostname. While the API component is exposed on a `/api` route to avoid an otherwise necessary CORS setup.

The stack requires the following components to be setup externally:

 - Docker Swarm (though minor with minor changes, this works with Compose)
 - a running and to the stack accessible MinIO
 - Traefik v1.7 (configured via labels)
 - Traefik ingress via an attachable (Docker) network named `public`

### Run in docker

Before running make sure that you minio server and adminio-api is started.

`` docker run rzrbld/adminio-ui:latest ``

This example run only for test purposes, unless you running UI and API of adminio on the same server.

### Run in real environment
#### Docker
| Environment | Description | Default |
| --- | --- | --- |
|  API_BASE_URL  | [adminio-api](https://github.com/rzrbld/adminio-api) REST endpoint | http://localhost:8080  |
|  ADMINIO_PROD  |  production mode, can be ``true`` or ``false``  | ``false``  |
|  ADMINIO_MULTI_BACKEND  | multibackend mode, can be ``true`` or ``false``  | ``false``  |
|  ADMINIO_BACKENDS  |  json obj with names and urls of all you [adminio-api](https://github.com/rzrbld/adminio-api) instances  |  ``[{"name":"myminio","url":"http://localhost:8080"},{"name":"localhost","url":"http://localhost:8081"},{"name":"error","url":"http://localhost:8082"}]`` |
|  NGX_ROOT_PATH | nginx location variable | `/` |
|  NGX_PORT | nginx port variable | `80` |

In real life cases you'll need to change this environment variables at `` Dockerfile `` - `` API_BASE_URL `` which points to [adminio-api](https://github.com/rzrbld/adminio-api) REST endpoint and `` ADMINIO_PROD `` which can be set to `` true `` or `` false ``.

If you run multiple instances of [adminio-api](https://github.com/rzrbld/adminio-api) you can set `` ADMINIO_MULTI_BACKEND `` to ``true`` and fill  `` ADMINIO_BACKENDS `` example with needed urls and names. Please note - in this case you still need points ``API_BASE_URL`` to one of this instances. And then build a docker image.
#### Kubernetes/OpenShift/OKD/OCP
go to [Helm chart](https://github.com/rzrbld/adminio-helm) repo

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
