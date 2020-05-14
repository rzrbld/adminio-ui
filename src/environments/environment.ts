export const environment = {
  production: false,
  apiBaseUrl: "http://localhost:8080",
  apiMultiBackend: false,
  apiBackends: [{"name":"myminio","url":"http://localhost:8080"},{"name":"not-myminio","url":"http://minio.example.com:8080"}]
};
