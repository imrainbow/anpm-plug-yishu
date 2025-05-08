const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://129.211.213.154:8000',
        target: 'http://localhost:8000',
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