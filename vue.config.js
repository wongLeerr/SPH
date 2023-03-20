const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 项目打包是否需要生成map文件
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  // 代理服务器
  devServer: {
    proxy: {
      '/api': {
        // 请求的服务器地址
        target: 'http://gmall-h5-api.atguigu.cn',
        // 请求的地址中就有/api，因此无需从路径中自动去除
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})
