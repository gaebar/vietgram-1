// set our node environment to be test
process.env.NODE_ENV = 'test'

// require chai library, attaching some methods to the global object
const chai = require('chai')
global.should = chai.should()
global.expect = chai.expect

// supertest makes mock HTTP requests
const supertest = require('supertest')
const app = require('../index.js')
global.api = supertest(app)
