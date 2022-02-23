const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/sample_project', // 불러오려는 server 의 api path
    createProxyMiddleware({
      target: 'http://13.124.207.219:8080/sample_project', // server 주소를 넣어주면 된다.
      changeOrigin: true,
    })
  );
};