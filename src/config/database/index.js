const mongoose = require('mongoose')

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

const connect = () => {
    mongoose.connect(process.env.DB_URL, dbOptions)
        .then(_ => console.log('Conectado a: ' + process.env.DB_URL))
        .catch(err => console.log(err))
}

module.exports = {
    connect
}
