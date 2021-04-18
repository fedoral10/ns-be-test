const { covid19Api } = require('../../api/index')
const { statistics, country } = require('../../models')

const sync = async () => {
    try {
        const res = await covid19Api.statistics()
        const statisticsData = res.data.response

        const r = await covid19Api.countries()
        const countries = r.data.response

        await statistics.deleteMany({})
        await country.deleteMany({})

        await country.create(countries.map(item => ({ name: item })))
        const created = await statistics.create(statisticsData)

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
        if (filter) {
            return statistics.findOne(filter, '-_id')
        } else {
            return statistics.find({}, '-_id')
        }
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

        await statistics.findOneAndUpdate({ country: country }, {
            cases: body.cases,
            deaths: body.deaths,
            tests: body.tests
        })

        return 'Actualizado'
    } catch (err) {
        console.log(err)
        return err
    }
}

const getStatistics = async (country) => {
    try {
        const fromDb = await getStatisticsFromDb(country)

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

const getCountries = async (_) => {
    try {
        const fromDb = await country.find({}, '-_id name')
        if (fromDb === null) {
            return 'Debe sincronizar la db'
        }

        return fromDb
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    sync,
    getStatistics,
    postStatistics,
    getCountries
}
