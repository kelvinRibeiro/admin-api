const utils   = {}

const express = require('express')
const app     = express()
const server  = require('http').createServer(app)
const io      = require('socket.io').listen(server)

const env  = require('../../env.json')

const socket_port = env.SOCKET_PORT || env.API_PORT - 1000
server.listen(socket_port)

utils.callback = (res, response, event) => {
 
  if(event){
    io.emit(event, response.data)
  }

  res.json(response)
}

utils.response = (err, data) => {
  return { 
    success: err ? false : true, 
    message: err ? err.toString() : 'Operation success', 
    data:    data ? data: null
  }
}

module.exports = utils
