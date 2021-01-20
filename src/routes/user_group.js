'use strict'

const express = require('express')
const router = express.Router()

const auth_ = require('../packages/auth')
const access_control = require('../packages/access_control')

const utils = require('../packages/utils')

const controller = require('../controllers/user_group')

router.get('/all', [ auth_.authorized, access_control.check ], (req, res) => {
	controller.all(req, res, utils.callback)
})

router.get('/show', [ auth_.authorized, access_control.check ], (req, res) => {
	controller.show(req, res, utils.callback)
})

router.post('/add', [ auth_.authorized, access_control.check ], (req, res) => {
	controller.add(req, res, utils.callback)
})

router.put('/update', [ auth_.authorized, access_control.check ], (req, res) => {
	controller.update(req, res, utils.callback)
})

router.delete('/delete', [ auth_.authorized, access_control.check ], (req, res) => {
	controller.delete(req, res, utils.callback)
})

module.exports = router
