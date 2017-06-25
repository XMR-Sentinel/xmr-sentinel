const chai = require('chai')
const path = require('path')
const unirest = require('unirest')
const fs = require('fs')
const _ = require('lodash')
const nock = require('nock')
const nodeUrl = 'http://127.0.0.1:9999'
const nodeMock = nock(nodeUrl)

const appDir = (path.resolve(__dirname) + '/').replace('lib/utils/', '')
const mainFile = require(appDir + 'index.js')
const utils = mainFile.utils

const hashPage = fs.readFileSync(appDir + 'sample-pages/Hashrate Report.html')
const connectionPage = fs.readFileSync(appDir + 'sample-pages/Connection Report.html')
const Result = fs.readFileSync(appDir + 'sample-pages/Result Report.html')


describe('Testing utils module', () => {
  describe('getPage Funciton', () => {
    it('should return haspage', function(done) {

      const mockOpts = {
        html: hashPage,
        url: nodeUrl
      }

      const page = 'h'

      const address = {
        ip: 'http://127.0.0.1',
        port: '9999'
      }

      nodeMock.get('/'+page).reply(200, mockOpts.html)

      utils
        .getPage(address, 'h')
        .then(res => {
          var err = null

          try {
            console.log(res)
          } catch(e) {
            err = e
          }

          done(err)
        })
        .catch(err => done(err))

    })
  })
})
