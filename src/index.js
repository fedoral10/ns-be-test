const express = require('express')
const app = express();
const rutas = require('./routes').default
const morgan = require('morgan')
const cors = require('cors')

//Configuracion de CORS
var corsOptions = {
    origin: process.env.CORS_ORIGIN.split(' '),
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//Carga de variables de entorno
require('dotenv').config()

//llamada a la configuracion de DB
require('./config/database')

// Configuracion
app.set('port',process.env.PORT || 3000)

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))

// Rutas
app.use(rutas)

// Iniciar el servicio
app.listen(app.get('port'), () => {
    console.log('Servicio en puerto',app.get('port'))
})