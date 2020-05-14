export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:8080',
  apiMultiBackend: false,
  apiBackends: {"myminio":"http://localhost:8080","not-myminio":"http://minio.example.com:8080"}
};
