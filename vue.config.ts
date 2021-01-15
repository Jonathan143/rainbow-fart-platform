import path from 'path'

const resolve = dir => {
  return path.join(__dirname, dir)
}
// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version

const publicPath = './'

module.exports = {
  // 根据你的实际情况更改这里
  publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src')
        }
      }
    }
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      // 设置 scss 公用变量文件
      scss: {
        /*sass-loader 8.0语法 */
        // prependData: `@import '~@/theme/variables.scss';`

        /*sass-loader 9.0写法*/
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (relativePath.replace(/\\/g, '/') !== 'src/theme/variables.scss') {
            return '@import "~@/theme/variables.scss";' + content
          }
          return content
        }
      }
    }
  }
}
