module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/components',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  }
}
