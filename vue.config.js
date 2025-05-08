const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8000
  
  },
  chainWebpack: config => {
    config.module
      .rule('audio')
      .test(/\.(mp3|m4a|wav|ogg)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'audio/[name].[hash:8].[ext]'
      });
  }
})
