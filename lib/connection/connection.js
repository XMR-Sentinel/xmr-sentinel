const q = require('q')
const _ = require('lodash')
const path = require('path')
const async = require('async')
const cheerio = require('cheerio')
const appDir = (path.resolve(__dirname) + '/').replace('lib/connection/', '')
const mainFile = require(appDir + 'index.js')
const utils = mainFile.utils

/**
 * Get Pool address from the Connection page
 * @param  {String} connection HTML string of the connection page
 * @return {Promise}
 */
const getPoolAddress = function(connectionHtml) {
  var dfd = q.defer()

  return dfd.promise
}

/**
 * Get Pool Ping time from the Connection page
 * @param  {String} connection HTML string of the connection page
 * @return {Promise}
 */
const getPoolPing = function(connectionHtml) {
  var dfd = q.defer()

  return dfd.promise
}

/**
 * Get duration of the last uninterrupted connection with the pool
 * @param  {String} connection HTML string of the connection page
 * @return {Promise}
 */
const getConnectedSince = function(connectionHtml) {
  var dfd = q.defer()

  return dfd.promise
}

/**
 * Get list of all conections errors that happened since the mining started.
 * @param  {String} connection HTML string of the connection page
 * @return {Promise}
 */
const getErrorList = function(connectionHtml) {
  var dfd = q.defer()

  return dfd.promise
}

module.exports = {
  getPoolAddress: getPoolAddress,
  getPoolPing: getPoolPing,
  getConnectedSince: getConnectedSince,
  getErrorList: getErrorList
}
