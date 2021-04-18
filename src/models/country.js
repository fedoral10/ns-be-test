const { Schema } = require('mongoose')

const countrySchema = new Schema({
    name: String
})

module.exports = countrySchema
