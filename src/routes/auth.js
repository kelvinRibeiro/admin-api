'use strict'

const express = require('express')
const router = express.Router()

const utils = require('../packages/utils')

const controller = require('../controllers/auth')

router.post('/authenticate', (req, res) => {
	controller.authenticate(req, res, utils.callback)
})

module.exports = router