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
            expect(res.difficulty).to.be.equal(mock.poolResultData.difficulty)
            expect(res.info.accepted).to.be.equal(mock.poolResultData.info.accepted)
            expect(res.info.total).to.be.equal(mock.poolResultData.info.total)
            expect(res.info.ratio).to.be.equal(mock.poolResultData.info.ratio)
            expect(res.info.avgTime).to.be.equal(mock.poolResultData.info.avgTime)
            expect(res.poolSideHash).to.be.equal(mock.poolResultData.poolSideHash)
            expect(_.isEqual(res.errorList, mock.poolResultData.errorList)).to.be.ok
            expect(_.isEqual(res.topResults, mock.poolResultData.topResults)).to.be.ok

          } catch(e) {
            err = e
          }
          done(err)
        })
        .catch(err => done(err))

    })
  })
})
