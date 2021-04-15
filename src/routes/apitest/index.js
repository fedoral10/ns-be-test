const express = require('express')
const { sync, getStatistics, postStatistics } = require('../../controllers')
const router = express.Router()

router.get('/statistics', async (req, res) => {
    getStatistics()
        .then(salida => res.send(salida))
        .catch(_ => res.status(501).send('Error en el servidor'))
})

router.get('/statistics/:country', async (req, res) => {
    getStatistics(req.params.country)
        .then(salida => res.send(salida))
        .catch(_ => res.status(501).send('Error en el servidor'))
})

router.post('/statistics/:country', async (req, res) => {
    postStatistics(req.params.country,req.body)
        .then(salida => res.send(salida))
        .catch(_ => res.status(501).send('Error en el servidor'))
})

router.get('/sync', async (req, res) => {
    sync()
        .then(salida => res.send('Se ha sincronizado'))
        .catch(_ => res.status(501).send('Error en servidor'))
})

module.exports = router
