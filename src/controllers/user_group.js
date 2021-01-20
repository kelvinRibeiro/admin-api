'use strict'

const model = require('../models')
const utils = require('../packages/utils')
const socket_base = 'user_groups'

const _ = require('lodash')
const acl = require('../acl/permissions')

exports.all = (req, res, callback) => {

  model.acl_resources.findAll({
		attributes: {
			exclude: ['value']
    },
    order: [['key', 'ASC']]
	}).then( async (data) => {
    let count = await model.acl_resources.count()
    callback(res, utils.response(null, { rows: data, count }))
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.show = (req, res, callback) => {

  acl.whatResources(req.query.key, async (err, data) => {
    
    if(err){
      res.status(500)
      callback(res, utils.response(err))
      return
    }
    
    // acl whatResources returns an obj
    // convert to array
    let resources = Object.keys(data).map( key => {
      return { resources: key, data: data[key] } 
    })

    // format perms to return
    Promise.all(
      resources.map(r => {
        r.permissions = { get: false, post: false, put: false, delete: false }
        r.data.map(perm => { 

          if(perm == '*'){
            r.permissions.get    =  true
            r.permissions.post   =  true
            r.permissions.put    =  true
            r.permissions.delete =  true
          }

          if(perm == 'GET')
            r.permissions.get =  true
          
          if(perm == 'POST')
            r.permissions.post = true 
            
          if(perm == 'PUT')
            r.permissions.put = true
          
          if(perm == 'DELETE')
            r.permissions.delete =  true
        })

        delete r.data
      })
    )
    
    resources = _.sortBy(resources, r => r.resources)
    callback(res, utils.response(null, resources))
  })
}

exports.add = async (req, res, callback) => {
 
  // format perms to return
  await Promise.all(
    req.body.resources.map(r => {
      
      r.perms = []
    
      if(r.permissions.get)
        r.perms.push('GET')
      
      if(r.permissions.post)
        r.perms.push('POST')
        
      if(r.permissions.put)
        r.perms.push('PUT')
      
      if(r.permissions.delete)
        r.perms.push('DELETE')
    
      r.permissions = r.perms
      delete r.perms
    })
  )
  
	acl.allow([{ roles: req.body.role, allows: req.body.resources }], (err) => {
    if (err) {
      res.status(500)
      callback(res, utils.response(err))
      return
    }

    callback(res, utils.response(null, {}), `${ socket_base }_all`)
  })
}

exports.update = async (req, res, callback) => {

  let allows = []
 
  await  Promise.all(
     req.body.resources.map( async (item) => {

      let resource = { resources: item.resources, permissions: [] }

      if(item.perms.get){
        resource.permissions.push('GET')
      }else{
        await acl.removeAllow(req.body.roles, item.resources, 'GET')
      }

      if(item.perms.post){
        resource.permissions.push('POST')
      }else{
        await acl.removeAllow(req.body.roles, item.resources, 'POST')
      }
      
      if(item.perms.put){
        resource.permissions.push('PUT')
      }else{
        await acl.removeAllow(req.body.roles, item.resources, 'PUT')
      }

      if(item.perms.delete){
        resource.permissions.push('DELETE')
      }else{
        await acl.removeAllow(req.body.roles, item.resources, 'DELETE')
      }

      allows.push(resource)
    })
  )
  
  if(allows[0].permissions.length){

    acl.allow([{ roles: req.body.roles, allows: allows }] , (err) => {
      if (err) {
        res.status(500)
        callback(res, utils.response(err))
        return
      }

      callback(res, utils.response(null, {}), `${ socket_base }_all`)
    })

  }else{
    callback(res, utils.response(null, {}), `${ socket_base }_all`)
  }
}


exports.delete = (req, res, callback) => {

	acl.removeRole(req.query.uuid, (err) => {

    if(err){
      res.status(500)
      callback(res, utils.response(err))
      return
    }

		callback(res, utils.response(null, {}), `${ socket_base }_all`)
	})
}