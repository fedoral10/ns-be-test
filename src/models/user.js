const { Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    salt: String
})

module.exports = userSchema
