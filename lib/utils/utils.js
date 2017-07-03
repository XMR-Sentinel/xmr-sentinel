const q = require('q')
const _ = require('lodash')
const path = require('path')
const async = require('async')
const unirest = require('unirest')
const appDir = (path.resolve(__dirname) + '/').replace('lib/utils/', '')
const mainFile = require(appDir + 'index.js')

/**
 * Function to get pages
 * @param  {Object} address Object with IP and Port properties
 * @param  {String} page Page to get. The 'h' in '192.168.1.29/h'
 * @return {Promise}
 */
const getPage = function (address, page) {
  var dfd = q.defer()

  const errors = {
    noParam: 'No param was provided',
    noIp: 'No IP was provided',
    noPage: 'No page was provided',
    noPort: 'No port was provided',
    isOffline: 'Your mining node '+address.ip+':'+address.port+' is offline or was not found'
  }

  const funcArray = [
    (callback) => { // verify params
      var add = _.clone(address)
      if (_.isEmpty(address)) return callback(errors.noParam)
      if (!address.ip) return callback(errors.noIp)
      if (!address.port) return callback(errors.Port)
      if (!page) return callback(errors.Page)

      add.page = page
      callback(null, add)
    },
    (add, callback) => {
      if (callback) {
        unirest
        .get('http://' + add.ip + ':' + add.port + '/' + add.page)
        .end(res => {
          if (res.status != '200') return callback(errors.isOffline)
          callback(null, res.body)
        })
      }
    }
  ]

  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

module.exports = {
  getPage: getPage
}
