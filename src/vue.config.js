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
  },
}

module.exports = {
  // 基本路径
  publicPath: '../../',
  // 输出文件目录
  outputDir: 'dist'
}
