const fs = require('fs')
const _ = require('lodash')
const chai = require('chai')
const path = require('path')
const nock = require('nock')
const unirest = require('unirest')
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
  describe('getPoolAddress function', () => {
    it('Should be a function', function(done) {
      var err = null
      try{
        expect(connection.getPoolAddress).to.be.a('function')
      } catch(e) {
        err = e
      }
      done(err)
    })
  })
  describe('getConnectedSince function', () => {
    it('Should be a function', function(done) {
      var err = null
      try{
        expect(connection.getConnectedSince).to.be.a('function')
      } catch(e) {
        err = e
      }
      done(err)
    })
  })
  describe('getPoolPing function', () => {
    it('Should be a function', function(done) {
      var err = null
      try{
        expect(connection.getPoolPing).to.be.a('function')
      } catch(e) {
        err = e
      }
      done(err)
    })
  })
  describe('getErrorList function', () => {
    it('Should be a function', function(done) {
      var err = null
      try{
        expect(connection.getErrorList).to.be.a('function')
      } catch(e) {
        err = e
      }
      done(err)
    })
  })
})
