const express = require('express')
const { sync, getStatistics, postStatistics, getCountries } = require('../../controllers/mainApi')
const { ok, internalServerError } = require('../../shared/responseBuilder')
const router = express.Router()

router.get('/statistics', async (req, res) => {
    getStatistics()
        .then(salida => ok(res, salida))
        .catch(_ => internalServerError(res, 'Error en el servidor'))
})

router.get('/statistics/:country', async (req, res) => {
    getStatistics(req.params.country)
        .then(salida => ok(res, salida))
        .catch(_ => internalServerError(res, 'Error en el servidor'))
})

router.post('/statistics/:country', async (req, res) => {
    postStatistics(req.params.country, req.body)
        .then(salida => ok(res, salida))
        .catch(_ => internalServerError(res, 'Error en el servidor'))
})

router.get('/sync', async (req, res) => {
    sync()
        .then(salida => ok(res, 'Se ha sincronizado'))
        .catch(_ => internalServerError(res, 'Error en servidor'))
})

router.get('/countries', async (req, res) => {
    getCountries()
        .then(salida => ok(res, salida))
        .catch(_ => internalServerError(res, 'Error en servidor'))
})

module.exports = router
