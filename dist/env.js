(function (window) {
  window.__env = window.__env || {};

  window.__env.apiBaseUrl = "http://localhost:8080";
  window.__env.apiMultiBackend = true;
  window.__env.apiBackends = [{"name":"myminio","url":"http://localhost:8080"},{"name":"localhost","url":"http://localhost:8081"},{"name":"error","url":"http://localhost:8082"}];

}(this));
