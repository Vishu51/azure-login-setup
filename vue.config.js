module.exports = {
  publicPath: process.env.VUE_PUBLIC_PATH,
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    devtool: 'source-map',
    output: {
      filename: process.env.VUE_APP_NODE_ENV === 'production' ? '[name].[hash].js' : '[name].js',
      chunkFilename: process.env.VUE_APP_NODE_ENV === 'production' ? '[name].[hash].js' : '[name].js'
    }
  },
  filenameHashing: true,
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
    config.plugin('html').tap(args => {
      args[0].title = 'Data Server'
      return args
    })
  },
  pluginOptions: {
    i18n: {
      locale: process.env.VUE_APP_I18N_LOCALE,
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
