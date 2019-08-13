/* globals api, expect, describe, beforeEach, afterEach, it */

require('../spec_helper')

const User = require('../../models/user')
const Gem = require('../../models/gem')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

// test suite, container of tests
describe('Gem Tests', () => {

  let user = ''
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
        user = userData
        token = jwt.sign({ sub: userData._id }, secret, { expiresIn: '10d' })
        done()
      })
      .catch(done)
  })

  afterEach(done => {
    Gem.collection.deleteMany()
    User.collection.deleteMany()
    done()
  })

  describe('GET /api/gems', () => {

    beforeEach(done => {

      Gem.create({
        image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-markets-in-vietnam/allParagraphs/00/top10Set/00/image.jpg',
        caption: 'Han Market is a prominent attraction in Da Nang, having served the local population since the French occupation in the early 20th century. Located at the grand intersection of Tran Phu Street, Bach Dang Street, Hung Vuong Street and Tran Hung Dao Street, visitors can find hundreds of stalls selling just about everything from local produce and coffee beans to T-shirts, jewellery, and accessories.',
        location: 'Han Market',
        user: user,
        category: 'Markets'
      })
        .then(() => done())
        .catch(done)
    })

    // test case for checking 200 response
    it('should return a 200 response', done => {
      api
        .get('/api/gems')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(200, done)
    })

    it('should respond with a JSON object', done => {
      api
        .get('/api/gems')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8')
          done()
        })
    })

    it('should return an array of gems', done => {
      api
        .get('/api/gems')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })

    it('should return an array of gem objects', done => {
      api.get('/api/gems')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.body)
            .and.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              '__v',
              '_id',
              'caption',
              'category',
              'comments',
              'createdAt',
              'image',
              'likes',
              'location',
              'updatedAt',
              'user'
            ])
          done()
        })
    })

    it('gem objects should have properities: _id, image, caption, location, user, category', done => {
      api.get('/api/gems')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          const firstGem = res.body[0]

          expect(firstGem)
            .to.have.property('_id')
            .and.to.be.a('string')

          expect(firstGem)
            .to.have.property('image')
            .and.to.be.a('string')

          expect(firstGem)
            .to.have.property('caption')
            .and.to.be.a('string')


          expect(firstGem)
            .to.have.property('location')
            .and.to.be.a('string')

          expect(firstGem)
            .to.have.property('category')
            .and.to.be.a('string')

          done()
        })
    })

    describe('Make more than one gem', () => {

      beforeEach(done => {
        Gem.create([
          {
            caption: 'Han Market is a prominent attraction in Da Nang, having served the local population since the French occupation in the early 20th century. Located at the grand intersection of Tran Phu Street, Bach Dang Street, Hung Vuong Street and Tran Hung Dao Street, visitors can find hundreds of stalls selling just about everything from local produce and coffee beans to T-shirts, jewellery, and accessories.',
            location: 'Han Market',
            user: user,
            category: 'Markets',
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-markets-in-vietnam/allParagraphs/00/top10Set/0/image.jpg'
          },
          {
            caption: 'Cao Dai Temple is one of 1,000 Cao Dai Temples, and one of the most well-known temples in Vietnam. Constructed in the 1930s and completed in 1955, Cao Dai temple is a technicolored religious site that attracts hundreds of travelers every day.',
            location: 'Cao Dai Temple',
            user: user,
            category: 'Temples',
            image: 'https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/07/Cao-Dai-Temple.jpg'
          },
          {
            caption: 'Long Beach (Bai Trong) is a 20-km-long coastal area on Phu Quoc Island, where you can find swanky beachfront resorts, beachfront restaurants, cafés and bars with breathtaking sunset views.',
            location: 'Long Beach (Bai Trong)',
            user: user,
            category: 'Beaches',
            image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-beaches-in-vietnam/allParagraphs/00/top10Set/0/image.jpg'
          }
        ])
          .then(() => done())
          .catch(done)
      })

      it('should return three gems', done => {
        api
          .get('/api/gems')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            expect(res.body.length).to.equal(4)
            done()
          })
      })
    })
  })

  describe('GET /api/chats/:id', () => {

    let gem = {}

    beforeEach(done => {
      Gem.create({
        image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-markets-in-vietnam/allParagraphs/00/top10Set/00/image.jpg',
        caption: 'Han Market is a prominent attraction in Da Nang, having served the local population since the French occupation in the early 20th century. Located at the grand intersection of Tran Phu Street, Bach Dang Street, Hung Vuong Street and Tran Hung Dao Street, visitors can find hundreds of stalls selling just about everything from local produce and coffee beans to T-shirts, jewellery, and accessories.',
        location: 'Han Market',
        user: user,
        category: 'Markets'
      })
        .then(gemData => {
          return gem = gemData
        })
        .then(() => done())
        .catch(done)
    })

    it('should return a 200 response', done => {
      api
        .get(`/api/gems/${gem._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(200, done)
    })

    it('should respond with a JSON object', done => {
      api
        .get(`/api/gems/${gem._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8')
          done()
        })
    })

    it('should return a gem object', done => {
      api
        .get(`/api/gems/${gem._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.body)
            .and.be.an('object')
            .and.have.all.keys([
              '__v',
              '_id',
              'caption',
              'category',
              'comments',
              'createdAt',
              'image',
              'likes',
              'location',
              'updatedAt',
              'user'
            ])
          done()
        })
    })

    it('gem object should have properities: _id, title, image, comments', done => {
      api
        .get(`/api/gems/${gem._id}`)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          const gem = res.body

          expect(gem)
            .to.have.property('_id')
            .and.to.be.a('string')

          expect(gem)
            .to.have.property('image')
            .and.to.be.a('string')

          expect(gem)
            .to.have.property('caption')
            .and.to.be.a('string')


          expect(gem)
            .to.have.property('location')
            .and.to.be.a('string')

          expect(gem)
            .to.have.property('category')
            .and.to.be.a('string')

          done()
        })
    })
  })

  describe('POST /api/gems - Create Gem API Endpoint', () => {

    it('should return a 201 response', done => {
      api
        .post('/api/gems')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send( {
          caption: 'Han Market is a prominent attraction in Da Nang, having served the local population since the French occupation in the early 20th century. Located at the grand intersection of Tran Phu Street, Bach Dang Street, Hung Vuong Street and Tran Hung Dao Street, visitors can find hundreds of stalls selling just about everything from local produce and coffee beans to T-shirts, jewellery, and accessories.',
          location: 'Han Market',
          category: 'Markets',
          image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-markets-in-vietnam/allParagraphs/00/top10Set/0/image.jpg'
        }
        )
        .expect(201, done)
    })

    it('should create a gem', done => {
      api
        .post('/api/gems')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
          caption: 'Han Market is a prominent attraction in Da Nang, having served the local population since the French occupation in the early 20th century. Located at the grand intersection of Tran Phu Street, Bach Dang Street, Hung Vuong Street and Tran Hung Dao Street, visitors can find hundreds of stalls selling just about everything from local produce and coffee beans to T-shirts, jewellery, and accessories.',
          location: 'Han Market',
          user: user,
          category: 'Markets',
          image: 'http://static.asiawebdirect.com/m/.imaging/678x452/website/bangkok/portals/vietnam/homepage/vietnam-top10s/best-markets-in-vietnam/allParagraphs/00/top10Set/0/image.jpg'

        }
        )
        .end((err, res) => {
          const gem = res.body

          expect(gem)
            .to.have.property('_id')
            .and.to.be.a('string')

          expect(gem)
            .to.have.property('image')
            .and.to.be.a('string')

          expect(gem)
            .to.have.property('caption')
            .and.to.be.a('string')

          expect(gem)
            .to.have.property('location')
            .and.to.be.a('string')

          expect(gem)
            .to.have.property('user')
            .and.to.be.a('object')

          expect(gem)
            .to.have.property('category')
            .and.to.be.a('string')

          done()
        })
    })
  })
})
