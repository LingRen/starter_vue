'use strict'
const merge = require('webpack-merge')
const base = require('./env_base')

module.exports = merge(base, {
  WX_URL: '"test"'
})
