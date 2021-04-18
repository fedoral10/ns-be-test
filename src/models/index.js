const userSchema = require('./user')
const statisctisSchema = require('./statistics')
const { model } = require('mongoose')
const countrySchema = require('./country')

module.exports = {
    user: model('user', userSchema),
    statistics: model('statistics', statisctisSchema),
    country: model('country', countrySchema)
}
