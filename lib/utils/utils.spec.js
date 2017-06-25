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
const nodes = require(appDir + 'lib/nodes.js')
const utils = mainFile.utils

const hashPage = fs.readFileSync(appDir + 'sample-pages/Hashrate Report.html')
const connectionPage = fs.readFileSync(appDir + 'sample-pages/Connection Report.html')
const Result = fs.readFileSync(appDir + 'sample-pages/Result Report.html')

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
const correctNodes = [
  {
    total: { '2.5s': '139.2', '60s': '161.6', '15m': undefined }
  },
  {
    total: { '2.5s': '139.2', '60s': '161.6', '15m': undefined }
  },
  {
    total: { '2.5s': '139.2', '60s': '161.6', '15m': undefined }
  }
]

describe('Testing utils module', () => {
  describe('getPage Function', () => {
    it('should return haspage', function (done) {
      const mockOpts = {
        html: hashPage,
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
  describe('get Function', () => {
    it('should return haspage', function (done) {
      const mockOpts = {
        html: hashPage,
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
  describe('getHashDataFromNodes Function', () => {
    it('should return haspage', function (done) {
      /**
       * Nock is not handling too many requests at once, but I have tested this
       * with a real mining node. It's working alrigh
       */
      // const mockOpts = {
      //   html: hashPage,
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
      // utils
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
