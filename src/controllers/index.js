const { covid19Api } = require('../api/index')
const { statistics } = require('../models')

const sync = async () => {
    try {
        const res = await covid19Api.statistics()
        const arr = res.data.response

        await statistics.deleteMany({})

        const created = await statistics.create(arr)
        console.log('Todo bien')
        return created
    } catch (err) {
        console.log('Error', err)
        return err
    }
}

const getStatisticsFromDb = async (country) => {
    try {
        const filter = country ? {
            country: country
        } : undefined
        return statistics.findOne(filter)
    } catch (err) {
        console.log(err)
        return err
    }
}

const postStatistics = async (country, body) => {
    try {
        const fromDb = await getStatisticsFromDb(country)

        if (fromDb === null) {
            return 'Debe sincronizar la DB'
        }

        console.log(body)

        await statistics.findOneAndUpdate({ country: country }, body)

        return 'Actualizado'
    } catch (err) {
        console.log(err)
        return err
    }
}

const getStatistics = async (country) => {
    try {
        const fromDb = await getStatisticsFromDb(country)
        console.log(country, fromDb)

        if (fromDb === null) {
            return 'Debe sincronizar la db'
        }

        return fromDb

        /* const result = await covid19Api.statistics(country)
        console.log(result.data.response)
        return result.data.response */
    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports = {
    sync,
    getStatistics,
    postStatistics
}
