'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// DDOS
const Ddos = require('ddos')
const ddos = new Ddos({ burst: 20, limit: 15 })
app.use(ddos.express)

// Helmet
app.use(require('helmet')())

// Body
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

// Cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// Routes
const api = require('./routes/index')
app.use('/', api)

// Route 404
app.use((req, res, next) => res.status(404).send('ROUTE NOT FOUND'))

// Export
module.exports = app