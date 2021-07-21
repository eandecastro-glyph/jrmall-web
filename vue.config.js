module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 80,
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(20000000)
      .maxAssetSize(30000000)
  }
}
