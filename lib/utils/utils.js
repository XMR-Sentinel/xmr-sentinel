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
    isOffline: 'Your mining node is offline or was not found'
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
      if(callback) {
        unirest
        .get('http://'+add.ip + ':' + add.port + '/' + add.page)
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

/**
 * Loops through the nods on the config files and get all the hash data
 * @param  {Array} nodes Array of objects with node description
 * @return {Promise}
 */
const getHashDataFromNodes = (nodes) => {
  var dfd = q.defer()

  const errors = {
    noNodes: 'No nodes were provided',
  }

  const funcArray = [
    (callback) => { // verify params
      var nds = _.clone(nodes)
      if (_.isEmpty(nodes)) return callback(errors.noNodes)

      callback(null, nds)
    },
    (nds, callback) => {
      if(callback) {
        var data = []
        var count = 0
        _.forEach(nds, node => {
          getPage(node, 'h')
            .then(page => {
              return mainFile.hash.getHashData(page)
            })
            .then(hashData => {
              count++
              hashData.node = node
              data.push(hashData)
              if (count == nds.length) {
                callback(null, data)
              }
            })
            .catch(err => callback(err))
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

/**
 * Get total hash sum from nodes
 * @param  {Object} nodes Hash data of nodes
 * @return {Promise}
 */
const getHashSum = (nodes) => {
  var dfd = q.defer()

  const errors = {
    noNodes: 'No nodes were provided',
  }

  const funcArray = [
    (callback) => { // verify params
      var nds = _.clone(nodes)
      if (_.isEmpty(nodes)) return callback(errors.noNodes)

      callback(null, nds)
    },
    (nds, callback) => {
      nodes = _.reduce(nodes, (sum, node) => {
        // Eliminates the undefineds
        sum = sum.map(s => s? s : 0)
        node = node.total.map(n => n? n : 0)

        sum['2.5s'] = sum['2.5s'] + node['2.5s']
        sum['60s'] = sum['60s'] + node['60s']
        sum['15m'] = sum['15m'] + node['15m']

        return sum
      }, { '2.5s': 0, '60s': 0, '15m': 0 })
      console.log(nodes)
    }
  ]

  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

module.exports = {
  getPage: getPage,
  getHashDataFromNodes: getHashDataFromNodes,
  getHashSum: getHashSum
}
