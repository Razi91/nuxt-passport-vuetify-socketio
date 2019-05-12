const express = require('express')
const router = express.Router()
const { io } = require('../')

router.get('/test', (req, res) => {
  res.cookie('cokkieName', Math.random() + '_', { maxAge: 900000, httpOnly: false })
  res.json({
    status: true
  })
})

router.post('/test', (req, res) => {
  res.cookie('cokkieName', Math.random() + '_', { maxAge: 900000, httpOnly: false })
  res.json({
    status: false
  })
})

router.get('/ping', (req, res) => {
  io.sockets.emit('ping', { foo: 'bar' })
  res.json({
    status: false
  })
})

router.use('/auth', require('./auth'))

module.exports = router
