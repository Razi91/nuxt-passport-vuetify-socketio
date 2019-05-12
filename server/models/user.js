const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const findOrCreate = require('mongoose-find-or-create')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: false
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['Client', 'Manager', 'Admin'],
    default: 'Client'
  },
  googleKey: {
    type: String
  }
}, {
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password
    }
  }
})
UserSchema.plugin(findOrCreate)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

UserSchema.methods.toView = function () {
  return this.toJSON()
}

UserSchema.methods.comparePassword = function (candidatePassword, next) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err)
    next(null, isMatch)
  })
}
module.exports = mongoose.model('User', UserSchema)
