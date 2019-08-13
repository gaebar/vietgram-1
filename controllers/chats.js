const Chat = require('../models/chat')
require('dotenv').config()
const key = process.env.YANDEX_API_KEY
const axios = require('axios')

// <<< CHAT >>>
// INDEX
function indexRoute(req, res, next) {
  Chat
    .find()
    .then(chats => {
      if (!chats) throw new Error('Not Found')
      return res.status(200).json(chats)
    })
    .catch(next)
}

// SHOW
function showRoute(req, res, next) {
  req.body.user = req.currentUser
  const lang = req.currentUser.lang === 'vi' ? 'en-vi' : 'vi-en'
  Chat
    .findById(req.params.chatId)
    .populate('user')
    .populate('comments.user')
    .then(chat => {
      if (!chat) throw new Error('Not Found')
      return Promise.all([chat, ...chat.comments.map(comment => {
        return axios.get(encodeURI(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${comment.text}&lang=${lang}`))
      })])

    })
    .then(values => {
      const [ chat, ...comments ] = values
      chat.comments.forEach((comment, index) => {
        comment.text = comments[index].data.text[0]
      })
      res.json(chat)
    })
    .catch(next)
}

//<<< CHAT COMMENTS >>>
// COMMENT: CREATE
function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser
  Chat
    .findById(req.params.chatId)
    .then(chat => {
      if (!chat) throw new Error('Not Found')
      chat.comments.push(req.body)
      return chat.save()
    })
    .then(chat => res.status(201).json(chat))
    .catch(next)
}


// COMMENT: DELETE
function commentDeleteRoute(req, res, next) {
  req.body.user = req.currentUser
  Chat
    .findById(req.params.chatId)
    .populate('user')
    .then(chat => {
      if (!chat) throw new Error('Not Found')
      const comment = chat.comments.id(req.params.commentId)
      if (!comment) throw new Error('Not Found')
      if (!comment.user.equals(req.currentUser._id)) throw new Error('Unauthorized')
      comment.remove()
      return chat.save()
    })
    .then(() => res.status(200).json({ message: 'Comment deleted' }))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
