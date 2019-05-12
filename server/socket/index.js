const consola = require('consola')

module.exports = function (io) {
  io.on('connection', (socket) => {
    consola.info('Socket connected')
  })
}
