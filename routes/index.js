const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../../middleware/error-handler')

router.post('/users', userController.addUser)
router.get('/users', userController.getUsers)
router.put('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)
router.use('/', generalErrorHandler)

module.exports = router