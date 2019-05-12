const router = require('express').Router()
const passport = require('passport')
const config = require('../../config.js')

router.post('/register', passport.authenticate('local-signup'),
  function (req, res) {
    res.redirect('/')
  })

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      return res.json(user.toView())
    })
  })(req, res, next)
})

router.get('/me', (req, res) => {
  res.json({ user: req.user })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

if ('google' in config) {
  router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email', 'openid']
      }
    )
  )

  router.get('/google-callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/'
    }))
}

module.exports = router
