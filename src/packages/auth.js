'use strict'

const jwt  = require('jsonwebtoken')
const salt = require('../../config/secret').secret

const utils = require('./utils')

exports.decodedToken = async (token) => {
  let data = jwt.verify(token, salt)
  return data
}

exports.authorized = (req, res, next) => {

  const token = req.headers['x-access-token']

  if (!token) {
    res.status(401)
    return res.json( utils.response('Usuário desconectado, faça login.') )

  } else {
    
    jwt.verify(token, salt, (error, decoded) => {
      if (error) {
  
        res.status(403)
        return res.json( utils.response('Verificação para esse token é inválida.') )
      } else {
       
        if (decoded.ip === req.ip) {

          req.decoded = decoded
          next()  
        
        } else {
          res.status(422)
          return res.json( utils.response('Verificação para esse token é inválida.') )
        }

      }
    })

  }
}
