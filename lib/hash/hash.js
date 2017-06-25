const q = require('q')
const _ = require('lodash')
const async = require('async')
const cheerio = require('cheerio')

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

module.exports = {
  getHashData: getHashData
}
