const { Schema } = require('mongoose')

const statisticsSchema = new Schema({
    continent: String,
    country: String,
    population: Number,
    cases: {
        new: String,
        active: Number,
        critical: String,
        recovered: Number,
        '1M_pop': String,
        total: Number
    },
    deaths: {
        new: String,
        '1M_pop': String,
        total: Number
    },
    tests: {
        '1M_pop': String,
        total: String
    },
    day: Date,
    time: Date
})

module.exports = statisticsSchema
