'use strict'

const model = require('../models')
const utils = require('../packages/utils')
const socket_base = 'customers'

exports.all = async (req, res, callback) => {
   
  model.customers.findAll({
    include:[
      { model: model.customer_pfs, as: 'pf'},
      { model: model.customer_pjs, as: 'pj'},
    ],
    limit: req.query.limit, 
    offset: req.query.offset,
    order: [['createdAt', 'DESC']]
	}).then( async (data) => {
    let count = await model.customers.count()
    callback(res, utils.response(null, { rows: data, count }))
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.allActives = (req, res, callback) => {
  
  model.customers.findAll({ 
		where: { active: true },
    order: [['createdAt', 'DESC']]
	}).then( async (data) => {
    callback(res, utils.response(null, { rows: data }))
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.show = (req, res, callback) => {

  model.customers.findOne({ 
    include:[
      { model: model.customer_pfs, as: 'pf'},
      { model: model.customer_pjs, as: 'pj'},
    ],
		where: { uuid: req.query.uuid },
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
        { name: { [model.Sequelize.Op.iLike]: `%${ req.body.keyword }%` }},
        { cpf: { [model.Sequelize.Op.iLike]: `%${ req.body.keyword }%` } }
      ] 
    })
  }

  if(req.body.status != null && req.body.status != 'all')
    terms.push({ active: req.body.status })

  if(req.body.data_start && req.body.date_end)
    terms.push({ createdAt: { [model.Sequelize.Op.between]: [req.body.date_start, req.body.date_end] } })

  const query = {
    include:[
      { model: model.customer_pfs, as: 'pf'},
      { model: model.customer_pjs, as: 'pj'},
    ],
    where: { [model.Sequelize.Op.and]: terms },
    order: [['createdAt', 'DESC']]
  }

  model.customers.findAll(query).then( async (data) => {
    callback(res, utils.response(null, { rows: data, count: data.length }))
  }).catch( (err) => {

    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.add = (req, res, callback) => {
 
  model.customers.create(req.body.customer).then((data) => {
    
    if(data.customer_type == 'pf'){

      req.body.pf.customer_uuid = data.uuid

      model.customer_pfs.create(req.body.pf).then((data) => {
        callback(res, utils.response(null, data), `${ socket_base }_all`)
      }).catch( (err) => {

        res.status(500)
        callback(res, utils.response(err))
      })

    }else if(data.customer_type == 'pj'){

      req.body.pj.customer_uuid = data.uuid

      model.customer_pjs.create(req.body.pj).then((data) => {
        callback(res, utils.response(null, data), `${ socket_base }_all`)
      }).catch( (err) => {
        res.status(500)
        callback(res, utils.response(err))
      })
    }

  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.update = (req, res, callback) => {

  model.customers.update(req.body.customer, { where: { uuid: req.body.customer.uuid } }).then( (data) => {
    
    if(req.body.customer.customer_type == 'pf'){

      model.customer_pfs.update(req.body.pf, 
        { where: { customer_uuid: req.body.customer.uuid } })
      .then((data) => {
        callback(res, utils.response(null, data), `${ socket_base }_all`)
      })

    }else if(req.body.customer.customer_type == 'pj'){

      model.customer_pjs.update(req.body.pj, 
        { where: { customer_uuid: req.body.customer.uuid } }
      ).then((data) => {
        callback(res, utils.response(null, data), `${ socket_base }_all`)
      })
    }

  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.restore = (req, res, callback) => {

  model.customers.update({ active: true }, { where: { uuid: req.body.uuid } }).then( (data) => {
    callback(res, utils.response(null, data ), `${ socket_base }_all`)
  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.remove = (req, res, callback) => {

  model.customers.update({ active: false }, { where: { uuid: req.body.uuid } }).then( (data) => {
    callback(res, utils.response(null, data ), `${ socket_base }_all`)
  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}

exports.delete = (req, res, callback) => {

  model.customers.destroy({ where: { uuid: req.query.uuid } }).then( (data) => {
    callback(res, utils.response(null, data ), `${ socket_base }_all`)
  }).catch( (err) => {
    
    res.status(500)
    callback(res, utils.response(err))
  })
}