const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const followSchema =  new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  lang: { type: String, required: true },
  text: { type: String, required: true },
  userType: { type: String, required: true },
  followers: [followSchema]
})

userSchema.plugin(require('mongoose-unique-validator'))

userSchema
  .virtual('followCount')
  .get(function() {
    return this.followers.length
  })

userSchema.set('toJSON', {
  transform(doc, json) {
    delete json.password
    delete json.email
    return json
  }
})

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation
  })

userSchema.pre('validate', function checkPassword(next){
  if (this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match')
  }
  next()
})

userSchema.pre('save', function hashPassword(next){
  if (this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }
  next()
})

module.exports = mongoose.model('User', userSchema)
