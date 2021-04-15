const { Schema } = require('mongoose')

const userSchema = new Schema({
    user: String,
    password: String,
    salt: String
})

module.exports = userSchema