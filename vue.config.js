module.exports = {
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://zz.mawenli.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  } }
