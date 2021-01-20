'use strict'

const url = require('url')
const acl = require('../acl/permissions')
const utils = require('./utils')

exports.check = (req, res, next) => {
  
  if (!req.decoded) { 
    res.status(405)
    return res.json(utils.response('Usuário desconectado, faça o login!'))
  }

  // ACL check
  // sanitize URL (remove query string)
  let requestUrl = url.parse(req.originalUrl).pathname
  requestUrl = '/' + requestUrl.split('/')[1]
  
  // role(s), resource(s), permission(s), callback
  acl.areAnyRolesAllowed(req.decoded.sub.role, requestUrl, req.method, (err, isAllowed) => {

    if (err){
      res.status(405)
      return res.json(utils.response('Ocorreu um erro na verificação desse usuario!',))
    }

    if (!isAllowed){
      res.status(405)
      return res.json(utils.response('Usuário não tem permissão para acessar esse recurso'))
    }

    next()
  })
}