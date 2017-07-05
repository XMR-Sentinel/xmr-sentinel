const fs = require('fs')
const _ = require('lodash')
const chai = require('chai')
const path = require('path')
const nock = require('nock')
const nodeUrl = 'http://127.0.0.1:9999'
const nodeMock = nock(nodeUrl)
const expect = chai.expect

const appDir = (path.resolve(__dirname) + '/').replace('tests/connection/', '')
const testDir = (path.resolve(__dirname) + '/').replace('connection/', '')

const mainFile = require(appDir + 'index.js')

const connection = mainFile.connection
const utils = mainFile.utils

const mock = require(testDir + 'assets/assets.js')
const nodes = require(appDir + 'lib/nodes.js')

describe('Testing connection module', () => {
  describe('getConnectionData function', () => {
    it('Should be a function', function(done) {
      var err = null
      try{
        expect(connection.getConnectionData).to.be.a('function')
      } catch(e) {
        err = e
      }
      done(err)
    })
    it('Should return pool connection data', function(done) {
      var err = null

      connection
        .getConnectionData(mock.html.connectionPage.toString())
        .then(res => {
          try{
            console.log(res)
            console.log('----')
            console.log(mock.poolConnectionData)
            if (!_.isEqual(res, mock.poolConnectionData)) {
              throw new Error('Pool connection data is not parsing correctly')
            }
          } catch(e) {
            err = e
          }
          done(err)
        })
        .catch(err => done(err))

    })
  })
})
