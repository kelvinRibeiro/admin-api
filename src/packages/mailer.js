const mailer        = {}

const nodemailer    = require('nodemailer')
const handlebars    = require('handlebars')
const path          = require('path')
const htmlToText    = require('html-to-text')

const util          = require('util')
const fs            = require('fs')
const readFile      = util.promisify(fs.readFile)

const mailConf      = require('../config/mail')
const env  = require('../../env.json')

const template_path = env.MAIL_TMPL_PATH || ''

const transport = nodemailer.createTransport(mailConf)

async function prepareTemplate (filename, options) {  
  try {

    let templatePath = path.resolve(template_path, `${ filename }.html`)
    let content = await readFile(templatePath, 'utf8')

    // use handlebars to render the email template
    // handlebars allows more complex templates with conditionals and nested objects.
    let template = handlebars.compile(content)
    let html = template(options)
   
    // generate a plain-text version of the same email
    let text = htmlToText.fromString(html)

    return { html, text }
  } catch (error) {
    throw new Error('Cannot read the email template content.')
  }
}

mailer.send = (options) => {  

  return new Promise((resolve, reject) => {
    
    options.addresses.map(async (item) => {
      
      let { html, text } = await prepareTemplate(item.template, item.data)
      let mail = {
        from:    item.from || `Mail <maitemcom.br>`,
        to:      item.to,
        bcc:     item.bcc,
        subject: item.subject,
        html,
        text
      }

      if(item.attachments)
        mail.attachments = item.attachments

      await transport.sendMail(mail, (error, info) => {
        if(error)
          reject(error)
  
        resolve(info)
      })

    })

  })
}

module.exports = mailer