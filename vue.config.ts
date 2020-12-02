// 拼接路径
// const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version

const publicPath = '/'

module.exports = {
  // 根据你的实际情况更改这里
  publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    publicPath // 和 publicPath 保持一致
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: `@import '@/theme/variables.scss';`
      }
    }
  }
}
