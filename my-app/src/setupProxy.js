const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  // /api 表示代理路径
  // target 表示目标服务器的地址
  app.use(
    proxy('/api', {
    // http://localhost:8080/ 地址只是示例，实际地址以项目为准
      target: 'http://10.70.24.117/',
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
      // 重写接口路由
      logLevel: "debug"
    })
  )
}