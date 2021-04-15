const userSchema = require('./user')
const statisctisSchema = require('./statistics')
const { model } = require('mongoose')

module.exports = {
    user: model('user', userSchema),
    statistics: model('statistics', statisctisSchema)
}
