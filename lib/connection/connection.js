const q = require('q')
const _ = require('lodash')
const path = require('path')
const async = require('async')
const cheerio = require('cheerio')
const appDir = (path.resolve(__dirname) + '/').replace('lib/connection/', '')
const mainFile = require(appDir + 'index.js')
const utils = mainFile.utils

/**
 * Get connection information from the pool. Returns the Pool address,
 * pool connection time, pool ping time and list of connections errros.
 * @param  {String} connection HTML string of the connection page
 * @return {Promise}
 */
const getConnectionData = function (connectionHtml) {
  var dfd = q.defer()
  const errors = {
    noPage: 'No page was provided'
  }
  const funcArray = [
    (callback) => {
      if(!connectionHtml) return callback(error.noPage)
      callback(null, connectionHtml)
    },
    (htmlPage, callback) => {
      var connectionObj = {
        errorList: []
      }
      const $ = cheerio.load(connectionHtml)
      const tr = $('div.data>table>tbody>tr')
      try {
      } catch (e) {
        if (e) return callback(error.parseError)
      }

      tr.each((index, value) => {
        var text = $(value).find('td').text()
        switch (index) {
          case 0:
            connectionObj.poolAddress = text
            break
          case 1:
            connectionObj.connectedSince = new Date(text)
            break
          case 2:
            connectionObj.poolPing = text.replace(' ms', '')
            break
          case 3:
            break
          default:
            var errorDate = new Date(text.substring(0, 19))
            var errorTypeArray = text.substring(19, text.length).split(':')
            connectionObj.errorList.push({
              timeStamp: errorDate,
              type: errorTypeArray[0],
              details: errorTypeArray[1]
            })
            break
        }
      })

      callback(null, connectionObj)
    }
  ]

  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

module.exports = {
  getConnectionData: getConnectionData
}
