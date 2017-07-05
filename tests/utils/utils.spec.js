const fs = require('fs')
const _ = require('lodash')
const chai = require('chai')
const path = require('path')
const nock = require('nock')
const nodeUrl = 'http://127.0.0.1:9999'
const nodeMock = nock(nodeUrl)

const appDir = (path.resolve(__dirname) + '/').replace('tests/utils/', '')
const testDir = (path.resolve(__dirname) + '/').replace('utils/', '')

const mainFile = require(appDir + 'index.js')
const utils = mainFile.utils

const mock = require(testDir + 'assets/assets.js')

describe('Testing utils module', () => {
  describe('getPage Function', () => {
    it('should return haspage', function (done) {
      const mockOpts = {
        html: mock.html.hashPage,
        url: nodeUrl
      }

      const page = 'h'

      const address = {
        ip: '127.0.0.1',
        port: '9999'
      }

      nodeMock.get('/' + page).reply(200, mockOpts.html)

      utils
        .getPage(address, 'h')
        .then(res => {
          var err = null

          try {
            // console.log(res)
          } catch (e) {
            err = e
          }

          done(err)
        })
        .catch(err => done(err))
    })
  })


})
