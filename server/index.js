const http = require('http')
const express = require('express')
const consola = require('consola')
const session = require('express-session')
const { Nuxt, Builder } = require('nuxt')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const RedisStore = require('connect-redis')(session)
const proxy = require('http-proxy-middleware')
const config = require('../config')
module.exports = {}

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

module.exports.io = io
module.exports.app = app

if (config.dev) {
  const cors = require('cors')
  app.use(cors())
}

const sessionMid = session({
  secret: 'App secret',
  secure: process.env.NODE_ENV === 'production',
  cookie: { maxAge: 1000 * 60 * 60 * 2 },
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({})
})

if (process.env.DEVTYPE === 'frontend') {
  app.use(function (req, res, next) {
    if (req.originalUrl.startsWith('/api')) {
      return next()
    }
    return sessionMid(req, res, next)
  })
} else {
  app.use(sessionMid)
}

mongoose.connect(config.db)
mongoose.Promise = global.Promise

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
require('./auth')(passport)

if (process.env.DEVTYPE !== 'frontend') { // production and dev-backend
  require('./socket')(io)
  app.use(bodyParser.json())
  app.use('/api', require('./api'))
}

if (process.env.DEVTYPE === 'frontend') { // only dev frontend
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:3001',
      changeOrigin: true,
      cookieDomainRewrite: {
        'local.com': 'localhost'
      }
    })
  )
}

async function start() {
  const nuxt = new Nuxt(nuxtConfig)
  const { host, port } = nuxt.options.server
  if (process.env.DEVTYPE !== 'backend') {
    consola.log('Build front')
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } else {
      await nuxt.ready()
    }
    app.use(nuxt.render)
  }

  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
