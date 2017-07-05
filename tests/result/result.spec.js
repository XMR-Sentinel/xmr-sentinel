const fs = require('fs')
const _ = require('lodash')
const chai = require('chai')
const path = require('path')
const nock = require('nock')
const nodeUrl = 'http://127.0.0.1:9999'
const nodeMock = nock(nodeUrl)
const expect = chai.expect

const appDir = (path.resolve(__dirname) + '/').replace('tests/result/', '')
const testDir = (path.resolve(__dirname) + '/').replace('result/', '')

const mainFile = require(appDir + 'index.js')

const result = mainFile.result
const utils = mainFile.utils

const mock = require(testDir + 'assets/assets.js')
const nodes = require(appDir + 'lib/nodes.js')

describe('Testing result module', () => {
  describe('getResultData function', () => {
    it('Should be a function', function(done) {
      var err = null
      try{
        expect(result.getResultData).to.be.a('function')
      } catch(e) {
        err = e
      }
      done(err)
    })
    it('Should return pool result data', function(done) {
      var err = null

      result
        .getResultData(mock.html.resultPage.toString())
        .then(res => {
          try{
            if (!_.isEqual(res, mock.poolResultData)) {
              throw new Error('Pool result data is not parsing correctly')
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
