'use strict'

const model = require('../models')
const utils = require('../packages/utils')
const socket_base = 'users'

const bcrypt = require('bcrypt')

exports.all = (req, res, callback) => {

  model.users.findAll({
		attributes: {
			exclude: ['password']
    },
    limit: req.query.limit, 
    offset: req.query.offset,
    order: [['createdAt', 'DESC']]
	}).then( async (data) => {
    let count = await model.users.count()
    callback(res, utils.response(null, { rows: data, count }))
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.allActives = (req, res, callback) => {
  
  model.users.findAll({ 
		where: { active: true },
		attributes: {
			exclude: ['password']
    },
    order: [['createdAt', 'DESC']]
	}).then( async (data) => {
    callback(res, utils.response(null, { rows: data }))
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.show = (req, res, callback) => {

  model.users.findOne({ 
		where: { uuid: req.query.uuid },
		attributes: {
			exclude: ['password']
		} 
	}).then( (data) => {
    callback(res, utils.response(null, data))
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.search =  (req, res, callback) => {

  const terms = []
 
  if(req.body.keyword && req.body.keyword != ''){

    terms.push({ 
      [model.Sequelize.Op.or]: [
        { fullname: { [model.Sequelize.Op.iLike]: `%${ req.body.keyword }%` }},
        { username: { [model.Sequelize.Op.iLike]: `%${ req.body.keyword }%` } }
      ] 
    })
  }

  if(req.body.status != null && req.body.status != 'all')
    terms.push({ active: req.body.status })

  if(req.body.data_start && req.body.date_end)
    terms.push({ createdAt: { [model.Sequelize.Op.between]: [req.body.date_start, req.body.date_end] } })

  const query = {
    where: { [model.Sequelize.Op.and]: terms },
    order: [['createdAt', 'DESC']]
  }

  model.users.findAll(query).then( async (data) => {
    callback(res, utils.response(null, { rows: data, count: data.length }))
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.add = (req, res, callback) => {

	req.body.password =	bcrypt.hashSync(req.body.password, 10)

  model.users.create(req.body).then( (data) => {
    callback(res, utils.response(null, {}), `${ socket_base }_all`)
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.update = (req, res, callback) => {

	if (req.body.password) {
		req.body.password = bcrypt.hashSync(req.body.password, 10)
	} else {
		delete req.body.password
	}

  model.users.update(req.body, { where: { uuid: req.body.uuid } }).then( (data) => {
    callback(res, utils.response(null, {} ), `${ socket_base }_all`)
  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.restore = (req, res, callback) => {

  model.users.update({ active: true }, { where: { uuid: req.body.uuid } }).then( (data) => {
    callback(res, utils.response(null, data ), `${ socket_base }_all`)
  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.remove = (req, res, callback) => {

  model.users.update({ active: false }, { where: { uuid: req.body.uuid } }).then( (data) => {
    callback(res, utils.response(null, data ), `${ socket_base }_all`)
  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.delete = (req, res, callback) => {

  model.users.destroy({ where: { uuid: req.query.uuid } }).then( (data) => {
    callback(res, utils.response(null, data ), `${ socket_base }_all`)
  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}