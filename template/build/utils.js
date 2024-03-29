'use strict'
const path = require('path')
const glob = require('glob')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })

      if(loader === 'sass') {
        loaders.push({
          loader: 'sass-resources-loader',
          options: {
            // it need a absolute path

            resources: [path.resolve(__dirname, './../src/base/scss/index.scss')]
          }
        })
      }
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

/**
 * 获取页面的所有entry
 * @param {String} globPath 获取代码入口的js路径
 * @param {String} pathDir js的文件目录
 */
exports.getEntries = function (globPath, pathDir) {
  // 获取所有入口文件
  const files = glob.sync(globPath)
  let entries = {}
  let entry
  let dirname
  let basename
  let extname

  for (let i = 0; i < files.length; i++) {
    entry = files[i]
    dirname = path.dirname(entry)
    extname =  path.extname(entry)
    basename = path.basename(entry, extname)

    entries[basename] = [entry]
  }

  const PAGES = (process.env.PAGES || '').split(',')
  let newEntries = {}
  PAGES.forEach(key => {
    const value = entries[key]

    if (value) {
      newEntries[key] = value
    }
  })

  return Object.keys(newEntries).length ? newEntries : entries
}
