const express = require('express')
const router = express.Router()
const { userManageApi } = require('../../controllers')
const { ok, internalServerError } = require('../../shared/responseBuilder')

router.post('/login', async (req, res) => {
    try {
        const token = await userManageApi.login(req.body.username, req.body.password)
        ok(res, token)
    } catch (err) {
        internalServerError(res, 'Error al iniciar sesion')
    }
})

router.post('/signup', async (req, res) => {
    try {
        const usr = await userManageApi.signUp(req.body.username, req.body.password)
        ok(res, usr)
    } catch (err) {
        internalServerError(res, 'Error al crear el usuario')
    }
})

module.exports = router
