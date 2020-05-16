export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:8080",
  apiMultiBackend: true,
  apiBackends: [{"name":"myminio","url":"http://localhost:8080"},{"name":"localhost","url":"http://localhost:8081"}]
};
