// Carga de variables de entorno
require('dotenv').config()

const axios = require("axios").default;

class Covid19Api {
    headers = {}
    host = null

    constructor(host, key) {
        
        this.host = host
        this.headers = {
            'x-rapidapi-key': key,
            'x-rapidapi-host': host.toLowerCase().replace("https://","")
        }
        console.log("VALUES",this.host, this.headers)
    }

    history(country, day) {
        const options = {
            method: 'GET',
            url: `${this.host}/history`,
            params: { country: country, day: day },
            headers: this.headers
        }

        console.log(`Realiza peticion a API 'history'`)

        return axios.request(options)
    }

    statistics(country) {
        const options = {
            method: 'GET',
            url: `${this.host}/statistics`,
            params: country ? { country: country } : undefined,
            headers: this.headers
        }

        console.log(`Realiza peticion a API 'statistics'`)

        return axios.request(options)
    }

    countries(search) {
        const options = {
            method: 'GET',
            url: `${this.host}/countries`,
            params: search ? { search: search } : undefined,
            headers: this.headers
        }

        console.log(`Realiza peticion a API 'countries'`)

        return axios.request(options)
    }
}

module.exports = new Covid19Api(process.env.API_HOST, process.env.API_KEY)
