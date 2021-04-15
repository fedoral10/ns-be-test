const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) => {
    res.send("FINE")
})

router.post('/signup', async (req, res) => {
    res.send("ksksk")
})

module.exports = router