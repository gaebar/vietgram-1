const mongoose = require('mongoose')

const commentSchema =  new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
} ,{
  timestamps: true
})

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  comments: [commentSchema]
})

module.exports = mongoose.model('Chat', chatSchema)
