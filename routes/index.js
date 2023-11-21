const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => res.send('meow'))
router.use('/', (req, res) => res.redirect('/users'))

module.exports = router