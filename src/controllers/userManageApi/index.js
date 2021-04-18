const { user } = require('../../models')
const { sign } = require('jsonwebtoken')
const { hashMessageSalted, isPasswordCorrectSalted } = require('../../shared/crypto')

const signUp = async (username, password) => {
    try {
        const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/
        const re = new RegExp(regx)

        // Password lenght etc etc
        if (!re.test(password)) {
            throw new Error(`Password must have a min. 6 chars. a capital letter and a number`)
        }

        // Verify if user exist
        const exist = await user.findOne({ username })
        if (exist) {
            throw new Error(`There is a user with that login :(`)
        }

        const model = {
            username,
            password: await hashMessageSalted(password)
        }

        const usr = await user.create(model)
        return usr
    } catch (err) {
        console.log(err)
        throw err
    }
}

const login = async (username, password) => {
    try {
        // verificar que el usuario exista
        const usr = await user.findOne({ username })
        if (!usr) {
            throw new Error('Usuario no existe')
        }

        // verificar si el password es correcto
        const verifyPassword = await isPasswordCorrectSalted(usr.password, password)

        if (!verifyPassword) {
            throw new Error('Contraseña incorrecta')
        }

        // retornar el token
        const payload = {
            username: usr.username
        }

        return sign(payload, process.env.SECRET, { expiresIn: process.env.EXPIRESIN || '30s' })
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    signUp,
    login
}
