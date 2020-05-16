export const environment = {
  production: true,
  apiBaseUrl: "http://localhost:8080",
  apiMultiBackend: false,
  apiBackends: [{"name":"myminio","url":"http://localhost:8080"},{"name":"localhost","url":"http://localhost:8081"}]
};
