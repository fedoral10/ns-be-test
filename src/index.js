const express = require('express')
const app = express()
const rutas = require('./routes')
const morgan = require('morgan')
const cors = require('cors')

// Carga de variables de entorno
require('dotenv').config()

// Configuracion de CORS
var corsOptions = {
    origin: process.env.CORS_ORIGIN.split(' '),
    optionsSuccessStatus: 200
}

// llamada a la configuracion de DB
const db = require('./config/database')
db.connect()

// Configuracion
app.set('port', process.env.PORT || 3000)

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))

// Rutas
app.use(rutas)

// Iniciar el servicio
app.listen(app.get('port'), () => {
    console.log('Servicio en puerto', app.get('port'))
})
