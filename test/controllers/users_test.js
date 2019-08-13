/* globals api, expect, describe, beforeEach, afterEach, it */
require('../spec_helper')

const User = require('../../models/user')

describe('User tests', () => {

  beforeEach(done => {
    User.collection.deleteMany()
    done()
  })

  afterEach(done => {
    User.collection.deleteMany()
    done()
  })

  describe('POST /api/register', () => {

    it('Should return a 201 response', done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'bob',
          email: 'bob@gmail',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'imageurl',
          lang: 'en',
          text: 'Happy traveller, love dogs',
          userType: 'traveller'
        })
        .expect(201, done)
    })

    it('should create a user', done => {
      api
        .post('/api/register')
        .set('Accept', 'application/json')
        .send({
          username: 'bob',
          email: 'bob@gmail',
          password: 'pass',
          passwordConfirmation: 'pass',
          image: 'imageurl',
          lang: 'en',
          text: 'Happy traveller, love dogs',
          userType: 'traveller'
        })
        .end((err, res) => {
          const user = res.body

          expect(user)
            .to.have.property('_id')
            .and.to.be.a('string')
          expect(user)
            .to.have.property('username')
            .and.to.be.a('string')
          expect(user)
            .to.have.property('image')
            .and.to.be.a('string')
          expect(user)
            .to.have.property('lang')
            .and.to.be.a('string')
          expect(user)
            .to.have.property('text')
            .and.to.be.a('string')
          expect(user)
            .to.have.property('userType')
            .and.to.be.a('string')

          done()
        })
    })
  })

  describe('POST /api/login', () => {
    beforeEach(done => {
      User.create({
        username: 'bob',
        email: 'bob@gmail',
        password: 'pass',
        passwordConfirmation: 'pass',
        image: 'imageurl',
        lang: 'en',
        text: 'Happy traveller, love dogs',
        userType: 'traveller'
      })
        .then(() => done())
        .catch(done)
    })

    it('Should return a 200 response', done => {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'bob@gmail',
          password: 'pass'
        })
        .expect(200, done)
    })

    it('Should return a 200 response', done => {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'bob@gmail',
          password: 'pass'
        })
        .end((err, res) => {
          const token = res.body
          expect(token)
            .to.have.property('token')
            .and.to.be.a('string')
          done()
        })
    })
  })
})
