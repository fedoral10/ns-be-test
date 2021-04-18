const express = require('express')
const router = express.Router()
const { userManageApi } = require('../../controllers')
const { ok, internalServerError } = require('../../shared/responseBuilder')

router.post('/login', async (req, res) => {
    try {
        const token = await userManageApi.login(req.body.username, req.body.password)
        ok(res, token)
    } catch (err) {
        internalServerError(res, err.message)
    }
})

router.post('/signup', async (req, res) => {
    try {
        await userManageApi.signUp(req.body.username, req.body.password)
        ok(res, 'Usuario creado correctamente')
    } catch (err) {
        console.log(err.message)
        internalServerError(res, err.message)
    }
})

module.exports = router
