'use strict'
const merge = require('webpack-merge')
const base = require('./base')

module.exports = merge(base, {
  WX_URL: '"local"'
})