const q = require('q')
const _ = require('lodash')
const path = require('path')
const async = require('async')
const cheerio = require('cheerio')
const appDir = (path.resolve(__dirname) + '/').replace('lib/result/', '')
const mainFile = require(appDir + 'index.js')
const utils = mainFile.utils
/**
 * Get Difficulty, amount of google result, avarage result time, pool-side hashes,
 * Top 10 best results and error details
 * @param  {String} connection HTML string of the result page
 * @return {Promise}
 */
const getResultData = function (resultHtml) {
  var dfd = q.defer()
  const errors = {
    noPage: 'No page was provided'
  }
  const funcArray = [
    (callback) => {
      if(!resultHtml) return callback(error.noPage)
      callback(null, resultHtml)
    },
    (htmlPage, callback) => {
      var resultObj = {
        errorList: [],
        topResults: []
      }
      const $ = cheerio.load(resultHtml)
      const td = $('div.data>table>tbody>tr>td')
      try {
      } catch (e) {
        if (e) return callback(error.parseError)
      }

      td.each((index, value) => {
        var text = $(value).text()
        switch (true) {
          case (index == 0): // Difficulty
            resultObj.difficulty = parseInt(text)
            break
          case (index == 1): // Good Results

            var resultAmount = text.split('(')[0]
            var goodResults = parseInt(resultAmount.split('/')[0])
            var totalResults = parseInt(resultAmount.split('/')[1])
            ratio = parseFloat((goodResults/totalResults).toFixed(4))

            resultObj.info = {
              accepted: goodResults,
              total: totalResults,
              ratio: ratio
            }
            break
          case (index == 2): // Avarage Result Time
            resultObj.info.avgTime = parseFloat(text)
            break
          case (index == 3): // Pool side hashes
            resultObj.poolSideHash = parseInt(text)
            break
          case (index > 3 && index< 14): // Top Results
            resultObj.topResults.push(parseInt(text))
            break
          default: // Errors
            resultObj.errorList.push(text)
            break
        }
      })
      var chunkdArray =

      resultObj.errorList = _.chunk(resultObj.errorList, 3).map((error, index) => {
        return {
          type: error[0],
          count: error[1],
          timeStamp: new Date(error[2])
        }
      })


      callback(null, resultObj)
    }
  ]

  async.waterfall(
    funcArray,
    (err, result) => err ? dfd.reject(err) : dfd.resolve(result)
  )

  return dfd.promise
}

module.exports = {
  getResultData: getResultData
}
