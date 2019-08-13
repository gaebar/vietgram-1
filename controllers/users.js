const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

// register handler
function register(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
}

// login handler
function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) throw new Error('Unauthorized')
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '10d' })
      return res.status(200).json({ token: token })
    })
    .catch(next)
}

// Profile show handler
function profileShow(req, res, next) {
  req.body.user = req.currentUser
  User
    .findOne({ email: req.body.user.email })
    .then(user => {
      if (!user) throw new Error('Not found')
      return res.status(200).json(user)
    })
    .catch(next)
}

// Other users show handler
function userShow(req, res, next) {
  User
    .findById(req.params.userId)
    .populate('followers.user')
    .then(user => {
      if (!user) throw new Error('Not found')
      return res.status(200).json(user)
    })
    .catch(next)
}

function followRoute(req, res, next) {
  req.body.user = req.currentUser
  User
    .findById(req.params.userId)
    .then(user => {
      if (!user) throw new Error('Not Found')
      if (user.followers.some(follower => follower.user._id.equals(req.currentUser._id))) return user
      user.followers.push({ user: req.currentUser })
      return user.save()
    })
    .then(user => res.status(200).json(user))
    .catch(next)
}

module.exports = { register, login, profileShow, userShow, followRoute }
