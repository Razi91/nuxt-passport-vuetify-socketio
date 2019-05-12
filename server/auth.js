const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const config = require('../config.js')

const User = require('./models/user')

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy({}, (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false, { message: 'No such user' })
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (!isMatch) return done(null, false, { message: 'Incorrect password' })
        done(null, user)
      })
    })
  }))
  if ('google' in config) {
    passport.use(new GoogleStrategy({ ...config.google },
      function (request, accessToken, refreshToken, profile, done) {
        console.log(profile)
        User.findOrCreate({ googleKey: profile.googleKey }, function (err, user) {
          return done(err, user)
        })
      }
    ))
  }
}
