const { defineConfig } = require('@vue/cli-service')
// 直接在这里定义配置，不再导入外部文件
const baseUrl = process.env.NODE_ENV === 'development'
  ? "http://129.211.213.154:8000"
  : "http://129.211.213.154:8000"

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: baseUrl,
        // target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
    },
  },
  chainWebpack: config => {
    config.plugins.delete('hmr')
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization = config.optimization || {}
      config.optimization.minimizer = config.optimization.minimizer || []
      const TerserPlugin = require('terser-webpack-plugin')
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 移除console
              drop_debugger: true // 移除debugger
            }
          }
        })
      )
    }
  }
})