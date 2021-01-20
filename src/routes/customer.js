'use strict'

const express = require('express')
const router = express.Router()

const utils = require('../packages/utils')

const controller = require('../controllers/customer')

router.get('/all', (req, res) => {
	controller.all(req, res, utils.callback)
})

router.get('/allActives', (req, res) => {
	controller.allActives(req, res, utils.callback)
})

router.get('/show', (req, res) => {
	controller.show(req, res, utils.callback)
})

router.post('/search', (req, res) => {
	controller.search(req, res, utils.callback)
})

router.post('/add', (req, res) => {
	controller.add(req, res, utils.callback)
})

router.put('/update', (req, res) => {
	controller.update(req, res, utils.callback)
})

router.put('/restore', (req, res) => {
	controller.restore(req, res, utils.callback)
})

router.put('/remove', (req, res) => {
	controller.remove(req, res, utils.callback)
})

router.delete('/delete', (req, res) => {
	controller.delete(req, res, utils.callback)
})

module.exports = router
