const q = require('q')
const _ = require('lodash')
const path = require('path')
const async = require('async')
const cheerio = require('cheerio')
const appDir = (path.resolve(__dirname) + '/').replace('lib/hash/', '')
const mainFile = require(appDir + 'index.js')
const utils = mainFile.utils
/**
 * Function to parse hash html data to JSON
 * @param  {String} hashPage HTML string of the page
 * @return {Promise}         Promise
 */
const getHashData = (hashPage) => {
  var dfd = q.defer()

  const errors = {
    noParam: 'No param was provided',
    parseError: 'Couldn\'t parse html. Check if it is valid'
  }

  const funcArray = [
    (callback) => { // verify params
      if (!hashPage) return callback(errors.noIp)

      callback(null, hashPage)
    },
    (html, callback) => {
      if (callback) {
        const $ = cheerio.load(html)
        const tr = $('div.data>table>tbody>tr')
        var array = []
        var hashData = {
          cores: []
        }
        try{
          hashData.title = $('title').html()
        } catch(e) {
          if (e) return callback(error.parseError)
        }

        tr.each((index, value) => {
          switch (index) {
            case 0:
              break

            case tr.length - 2: // total
              hashData.total = _.compact($(value).find('td').text().split(' '))
              break

            case tr.length - 1: // highest
              hashData.highest = $(value).find('td').text()
              break

            default:
              array[index] = _.compact($(value).find('td').text().split(' '))
              break
          }
        })

        hashData.cores = _.compact(array.map(core => {
          return {
            '2.5s': core[0],
            '60s': core[1],
            '15m': core[2]
          }
        }))

        hashData.total = {
          '2.5s': hashData.total[0],
          '60s': hashData.total[1],
          '15m': hashData.total[2]
        }

        callback(null, hashData)
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
          utils.getPage(node, 'h')
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

        sum.total = _.mapValues(sum.total, s => s? s : 0)
        node.total = _.mapValues(node.total, n => n? n : 0)

        sum.total['2.5s'] = (parseFloat(sum.total['2.5s']) + parseFloat(node.total['2.5s'])).toFixed(2)
        sum.total['60s'] = (parseFloat(sum.total['60s']) + parseFloat(node.total['60s'])).toFixed(2)
        sum.total['15m'] = (parseFloat(sum.total['15m']) + parseFloat(node.total['15m'])).toFixed(2)

        return sum
      }, {total: { '2.5s': 0, '60s': 0, '15m': 0 }})
      callback(null, nodes)
    }
  ]

  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

module.exports = {
  getHashData: getHashData,
  getHashDataFromNodes: getHashDataFromNodes,
  getHashSum: getHashSum
}
