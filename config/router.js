const router = require('express').Router()
const gems = require('../controllers/gems')
const chats = require('../controllers/chats')
const users = require('../controllers/users')
const secure = require('../lib/secureRoute')

// gems route
router.route('/gems/:gemId/likes')
  .get(secure, gems.like)

router.route('/gems/:gemId/comments/:commentId')
  .delete(secure, gems.commentDelete)

router.route('/gems/:gemId/comments')
  .post(secure, gems.commentCreate)

router.route('/gems/:gemId')
  .get(secure, gems.show)
  .put(secure, gems.edit)
  .delete(secure, gems.delete)

router.route('/gems')
  .get(secure, gems.index)
  .post(secure, gems.create)


// chats routes

router.route('/chats/:chatId/comments/:commentId')
  .delete(secure, chats.commentDelete)

router.route('/chats/:chatId/comments')
  .post(secure, chats.commentCreate)

router.route('/chats/:chatId')
  .get(secure, chats.show)

router.route('/chats')
  .get(secure, chats.index)


// user login and register router
router.route('/users/:userId/followers')
  .get(secure, users.followRoute)

router.route('/users/:userId')
  .get(secure, users.userShow)

router.route('/profile')
  .get(secure, users.profileShow)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

// other route not found
router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Route Not Found' }))

module.exports = router
