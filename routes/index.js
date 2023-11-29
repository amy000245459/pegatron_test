const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const {upload} = require('../middleware/multer') 
const { generalErrorHandler } = require('../middleware/error-handler')

router.delete('/users/pic/:userId/:picId', userController.deletePicture)
router.post('/users',upload.array('picture',10), userController.postUser)
router.get('/users', userController.getUsers)
router.get('/users/download', userController.downloadUsers)

router.put('/users/:id', upload.array('picture'), userController.putUser)
router.delete('/users/:id', userController.deleteUser)


router.use('/', (req, res) => res.redirect('/users'))
router.use('/', generalErrorHandler)

module.exports = router