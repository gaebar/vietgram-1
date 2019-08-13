const Gem = require('../models/gem')

function indexRoute(req, res, next) {
  Gem
    .find()
    .populate('user')
    .then(gems => {
      if (!gems) throw new Error('Not Found')
      return res.status(200).json(gems)
    })
    .catch(next)
}

function showRoute(req, res, next) {
  Gem
    .findById(req.params.gemId)
    .populate('user')
    .populate('comments.user')
    .then(gem => {
      if (!gem) throw new Error('Not Found')
      return res.status(200).json(gem)
    })
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser
  Gem
    .create(req.body)
    .then(gem => res.status(201).json(gem))
    .catch(next)
}

function editRoute(req, res, next) {
  req.body.user = req.currentUser
  Gem
    .findById(req.params.gemId)
    .then(gem => {
      if (!gem) throw new Error('Not Found')
      if (!gem.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
      Object.assign(gem, req.body)
      return gem.save()
    })
    .then(gem => res.status(200).json(gem))
    .catch(next)
}

function deleteRoute(req, res, next) {
  req.body.user = req.currentUser
  Gem
    .findByIdAndRemove(req.params.gemId)
    .then(gem => {
      if (!gem) throw new Error('Not Found')
      if (!gem.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
    })
    .then(() => res.status(204).json({ message: 'Deleted successfully ' }))
    .catch(next)
}

function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser
  Gem
    .findById(req.params.gemId)
    .then(gem => {
      if (!gem) throw new Error('Not Found')
      gem.comments.push(req.body)
      return gem.save()
    })
    .then(gem => res.status(201).json(gem))
    .catch(next)
}


function commentDeleteRoute(req, res, next) {
  req.body.user = req.currentUser
  Gem
    .findById(req.params.gemId)
    .then(gem => {
      if (!gem) throw new Error('Not Found')
      const comment = gem.comments.id(req.params.commentId)
      if (!comment) throw new Error('Not Found')
      if (!comment.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
      comment.remove()
      return gem.save()
    })
    .then(() => res.status(200).json({ message: 'Deleted successfully ' }))
    .catch(next)
}

function likeRoute(req, res, next) {
  req.body.user = req.currentUser
  Gem
    .findById(req.params.gemId)
    .populate('likes.user')
    .then(gem => {
      if (!gem) throw new Error('Not Found')
      if (gem.likes.some(like => like.user.equals(req.currentUser))) return gem
      gem.likes.push({ user: req.currentUser })
      return gem.save()
    })
    .then(gem => res.status(200).json(gem))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute,
  like: likeRoute
}
