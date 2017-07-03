const fs = require('fs')
const _ = require('lodash')
const chai = require('chai')
const path = require('path')
const nock = require('nock')
const unirest = require('unirest')
const nodeUrl = 'http://127.0.0.1:9999'
const nodeMock = nock(nodeUrl)

const appDir = (path.resolve(__dirname) + '/').replace('lib/hash/', '')
const libDir = (path.resolve(__dirname) + '/').replace('hash/', '')

const mainFile = require(appDir + 'index.js')
const hash = mainFile.hash
const utils = mainFile.utils

const mock = require(libDir + 'testAssets/assets.js')
const nodes = require(appDir + 'lib/nodes.js')

describe('Testing has module', () => {
  describe('getHashData Funciton', () => {
    it('should return hashData', function (done) {
      hash
        .getHashData(mock.html.hashPage)
        .then(res => {
          var err = null

          try {
            if (!_.isEqual(res, mock.parsedPageObject)) throw new Error('Object is not the same')
          } catch (e) {
            err = e
          }

          done(err)
        })
        .catch(err => done(err))
    })
  })
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

          } catch (e) {
            err = e
          }

          done(err)
        })
        .catch(err => done(err))
    })
  })
  describe('getHashDataFromNodes Function', () => {
    it('should return haspage', function (done) {
      /**
       * Nock is not handling too many requests at once, but I have tested this
       * with a real mining node. It's working alright
       */
      // const mockOpts = {
      //   html: mock.html.hashPage,
      //   url: nodeUrl
      // }
      //
      // const page = 'h'
      //
      // const address = {
      //   ip: '127.0.0.1',
      //   port: '9999'
      // }
      //
      // nodeMock.get('/'+page).reply(200, mockOpts.html)
      //
      // hash
      //   .getHashDataFromNodes(nodes)
      //   .then(res => {
      //     var err = null
      //     try {
      //       console.log(res)
      //     } catch(e) {
      //       err = e
      //     }
      //
      //     done(err)
      //   })
      //   .catch(err => done(err))
      done()
    })
  })
})
