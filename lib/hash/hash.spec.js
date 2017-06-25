const chai = require('chai')
const path = require('path')
const unirest = require('unirest')
const fs = require('fs')
const _ = require('lodash')
const nock = require('nock')
const nodeUrl = 'http://127.0.0.1:9999'
const nodeMock = nock(nodeUrl)

const appDir = (path.resolve(__dirname) + '/').replace('lib/hash/', '')
const mainFile = require(appDir + 'index.js')
const hash = mainFile.hash

const hashPage = fs.readFileSync(appDir + 'sample-pages/Hashrate Report.html')
const correctObj = {
  cores: [
    { '2.5s': '39.4', '60s': '40.0', '15m': '40.1' },
    { '2.5s': '41.5', '60s': '41.8', '15m': '41.7' },
    { '2.5s': '39.8', '60s': '40.0', '15m': '40.0' },
    { '2.5s': '40.6', '60s': '40.4', '15m': '40.3' },
    { '2.5s': '40.8', '60s': '40.7', '15m': '40.7' },
    { '2.5s': '40.6', '60s': '40.5', '15m': '40.5' },
    { '2.5s': '39.8', '60s': '39.8', '15m': '39.8' }
  ],
  title: 'Hashrate Report',
  total: {
    '2.5s': '282.4',
    '60s': '283.1',
    '15m': '283.1'
  },
  highest: ' 284.6'
}

describe('Testing has module', () => {
  describe('getHashData Funciton', () => {
    it('should return hashData', function (done) {
      hash
        .getHashData(hashPage)
        .then(res => {
          var err = null

          try {
            if (!_.isEqual(res, correctObj)) throw new Error('Object is not the same')
          } catch (e) {
            err = e
          }

          done(err)
        })
        .catch(err => done(err))
    })
  })
})
