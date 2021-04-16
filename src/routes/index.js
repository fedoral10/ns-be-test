const express = require('express')
const { tokenVerifyMiddleware } = require('../middlewares/jwt')
const router = express.Router()
const login = require('./login')
const mainApi = require('./mainApi')

router.use('/auth', login)
router.use('/', tokenVerifyMiddleware, mainApi)

module.exports = router
