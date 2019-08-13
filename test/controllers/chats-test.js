/* globals api, expect, describe, beforeEach, afterEach, it */
require('../spec_helper')
const Chat = require('../../models/chat')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
describe('Chat test', () => {
  let token = ''
  beforeEach(done => {
    User.create(
      {
        username: 'jennypham1',
        email: 'jennypham1@email',
        password: 'pass',
        passwordConfirmation: 'pass',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Midu_-_Summer_2012_%28Explored_1_-_May_24th%29_cropped.jpg',
        lang: 'vi',
        text: 'I know places yeah.',
        userType: 'Local'
      })
      .then(userData => {
        token = jwt.sign({ sub: userData._id }, secret, { expiresIn: '10d' })
        done()
      })
      .catch(done)
  })
  afterEach(done => {
    Chat.collection.deleteMany()
    User.collection.deleteMany()
    done()
  })
  describe('GET /api/chats', () => {
    beforeEach(done => {
      Chat.create([
        {
          title: 'Hotels',
          image: 'imageurl',
          comments: []
        }
      ])
        .then(() => done())
        .catch(done)
    })
    it('should return a 200 response', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(200, done)
    })
    it('should respond with a JSON object', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8')
          done()
        })
    })
    it('should return an array of chats', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })
    it('should return an array of chat objects', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.body)
            .and.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              '__v',
              '_id',
              'title',
              'image',
              'comments'
            ])
          done()
        })
    })
    it('chat objects should have properities: _id, title, image, comments', done => {
      api
        .get('/api/chats')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          const firstChat = res.body[0]
          expect(firstChat)
            .to.have.property('_id')
            .and.to.be.a('string')
          expect(firstChat)
            .to.have.property('title')
            .and.to.be.a('string')
          expect(firstChat)
            .to.have.property('image')
            .and.to.be.a('string')
          expect(firstChat)
            .to.have.property('comments')
            .and.to.be.a('array')
          done()
        })
    })
  })
  describe('GET /api/chats/:id', () => {

    let chat = {}

    beforeEach(done => {
      Chat.create({
        title: 'Hotels',
        image: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_412,c_fill,g_auto,h_232,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F170606122114-vietnam---travel-destination--shutterstock-168342398.jpg',
        comments: []
      })
        .then(chatData => {
          return chat = chatData
        })
        .then(() => done())
        .catch(done)
    })
    it('should return a 200 response', done => {
      api
        .get(`/api/chats/${chat._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(200, done)
    })
    it('should respond with a JSON object', done => {
      api
        .get(`/api/chats/${chat._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8')
          done()
        })
    })

    it('should return a chat object', done => {
      api
        .get(`/api/chats/${chat._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.body)
            .and.be.an('object')
            .and.have.all.keys([
              '__v',
              '_id',
              'title',
              'image',
              'comments'
            ])
          done()
        })
    })
    it('chat object should have properities: _id, title, image, comments', done => {
      api
        .get(`/api/chats/${chat._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          const chat = res.body

          expect(chat)
            .to.have.property('_id')
            .and.to.be.a('string')
          expect(chat)
            .to.have.property('title')
            .and.to.be.a('string')
          expect(chat)
            .to.have.property('image')
            .and.to.be.a('string')
          expect(chat)
            .to.have.property('comments')
            .and.to.be.a('array')
          done()
        })
    })
  })
})
