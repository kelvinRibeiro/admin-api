'use strict'

const model  = require('../models')
const utils  = require('../packages/utils')
const salt = require('../../config/secret').secret

const jwt 	 = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.authenticate = (req, res, callback) => {

  model.users.findOne({ where: { username: req.body.username, active: true } }).then( async (data) => {

		if(!data || data == ''){
			res.status(401)
			callback(res, utils.response('Falha na autenticação! Usuário não encontrado.'))
			return
		}

		if(!bcrypt.compareSync(req.body.password, data.password )) {
			res.status(401)
			callback(res, utils.response('Falha na autenticação! Usuário ou senha incorreto(s)'))
			return
		} else {

			let claim = {
				hostname: req.hostname,
				ip: 			req.ip,
				sub: {
					uuid: 		data.uuid,
					fullname: 	data.fullname,
					username: 	data.username,
					email: 		data.email,
					role:		data.role
				}	
			}

			let token = jwt.sign(claim, salt, { expiresIn: '10d' })

			callback(res, utils.response(null, { token } ) )

		}
		
  }).catch( (err) => {
    callback(res, utils.response(err))
  })
}