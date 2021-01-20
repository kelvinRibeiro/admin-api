'use strict'

const app   = require('../src/app')
const http  = require('http')
const https = require('https')
const debug = require('debug')('nodestr:server')
const fs    = require('fs')
const normalizePort = require('normalize-port')

const env  = require('../env.json')

const port = normalizePort(process.env.PORT || env.API_PORT)
app.set('port', port)

// HTTP
let server = http.createServer(app) 

// HTTPS
if (process.env.NODE_ENV === 'production') {

  let privateKey = fs.readFileSync('privkey.pem', 'utf8')
  let certificate = fs.readFileSync('fullchain.pem', 'utf8')

  let credentials = {
    key: privateKey,
    cert: certificate
  }

  server = https.createServer(credentials, app)
}

server.listen(port)
server.on('listening', listening)

const socket_port = env.SOCKET_PORT || env.API_PORT - 2000
console.log(`API running port on ${env.API_PORT} | SOCKET port on ${socket_port}...`)

function listening () {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

  debug('listening ' + bind)
}