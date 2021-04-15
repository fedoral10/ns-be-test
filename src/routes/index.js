const express = require('express')
const router = express.Router()
const login = require('./login')
const apitest = require('./apitest')

router.use('/auth', login)
router.use('/', apitest)

module.exports = router
