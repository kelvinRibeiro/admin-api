const express = require('express')
const router = express.Router()

const status 	 = require('./status')
const auth       = require('./auth')
const user_group = require('./user_group')
const user 	     = require('./user')
const customer 	 = require('./customer')

router.use('/status',      status)
router.use('/auth',        auth)
router.use('/user_group',  user_group)
router.use('/user',        user)
router.use('/customer',    customer)

module.exports = router
