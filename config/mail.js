module.exports = {
  host: 'mail.smtp.com.br',
	port: '587',
	secure: false,
	tls: {
		rejectUnauthorized: false
	},
	auth: {
	  user: 'mail.user',
	  pass: 'password'
  } 
}