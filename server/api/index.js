const express = require('express')
const router = express.Router()
const { io } = require('../')

router.get('/test', (req, res) => {
  res.json({
    status: true
  })
})

router.post('/test', (req, res) => {
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
