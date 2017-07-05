const q = require('q')
const _ = require('lodash')
const path = require('path')
const async = require('async')
const cheerio = require('cheerio')
const appDir = (path.resolve(__dirname) + '/').replace('lib/result/', '')
const mainFile = require(appDir + 'index.js')
const utils = mainFile.utils

module.exports = {
}
