const uploader = {}

const multer  = require('multer')
const path 		= require('path')

const env  = require('../../env.json')

const storage  = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.resolve(`${ env.FILES_PATH }/uploads`))
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname + '-' + Date.now())
	}
})

uploader.doUpload = (req, res) => {  
	
	const n = req.body.multiple || 6
	const upload = multer({ storage }).array('files', n )

	return new Promise((resolve, reject) => {

		upload(req, res, async (err) => {
			if(err)
        reject(err)

      req.body.files = []
      await Promise.all(
        req.files.map((file) => {
          req.body.files.push({ file: file.filename, mimetype: file.mimetype })
        })
			)
			
			resolve(req.body)
		})
	})
}
  
module.exports = uploader