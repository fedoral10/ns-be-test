const { user } = require('../../models')
const { sign } = require('jsonwebtoken')
const { hashMessageSalted, isPasswordCorrectSalted } = require('../../shared/crypto')

const signUp = async (username, password) => {
    try {
        const model = {
            username,
            password: await hashMessageSalted(password)
        }

        const usr = await user.create(model)
        return usr
    } catch (err) {
        console.log(err)
        return err
    }
}

const login = async (username, password) => {
    try {
        // verificar que el usuario exista
        const usr = await user.findOne({ username })
        if (!usr) {
            return 'Usuario no existe'
        }

        // verificar si el password es correcto
        const verifyPassword = await isPasswordCorrectSalted(usr.password, password)

        if (!verifyPassword) {
            return 'Contraseña incorrecta'
        }

        // retornar el token
        const payload = {
            username: usr.username
        }

        return sign(payload, process.env.SECRET, { expiresIn: process.env.EXPIRESIN || '30s' })
    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports = {
    signUp,
    login
}
