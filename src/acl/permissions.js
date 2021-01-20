const acl = require('acl')
const acl_seq    = require('acl-sequelize')
const sequelize = require('sequelize')

const config = require('../../config/config.json')

const dbconf = process.env.NODE_ENV == 'production' ? config.production : config.development
const db = new sequelize(
  `${ dbconf.dialect }://${ dbconf.username }:${ dbconf.password }@${ dbconf.host }/${ dbconf.database }`
)

// connect acl with our DB instance
const aclInstance = new acl(new acl_seq(db, { prefix: 'acl_' }))

/*
* ACL roles and permissions
* Note: all the permissions should be written in UPPERCASE (GET, POST, PUT, DELETE)
*/
aclInstance.allow([
   {
    roles: 'DEV'
    , allows: [
      { resources: '/dashboard',        permissions: ['GET','POST','PUT','DELETE'] }
      , { resources: '/customer',       permissions: ['GET','POST','PUT','DELETE'] }
      , { resources: '/user',           permissions: ['GET','POST','PUT','DELETE'] }
      , { resources: '/user_group',     permissions: ['GET','POST','PUT','DELETE'] }
    ]
  }
  , {
    roles: 'ADMIN'
    , allows: [
      { resources: '/dashboard',       permissions: ['GET','POST','PUT','DELETE'] }
      , { resources: '/customer',      permissions: ['GET','POST','PUT'] }
      , { resources: '/user',          permissions: ['GET','POST','PUT'] }
      , { resources: '/user_group',     permissions: [] }
    ]
  }
  , {
    roles: 'MANAGER'
    , allows: [
      { resources: '/dashboard',       permissions: ['GET','POST','PUT','DELETE'] }
      , { resources: '/customer',      permissions: ['GET','POST'] }
      , { resources: '/user',          permissions: ['GET','POST'] }
      , { resources: '/user_group',     permissions: [] }
    ]
  }
], (err) => {
  if (err) {
    console.log('Error while creating roles and permissions!', err)
  }
})

module.exports = aclInstance