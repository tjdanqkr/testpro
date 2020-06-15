const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      // target: "http://14.32.18.89:8080/",
      // target: "http://localhost:8080/",
      target: "http://192.168.1.145:8080/",
      changeOrigin: true,
    })
  );
};
