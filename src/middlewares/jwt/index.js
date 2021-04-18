const jwt = require('jsonwebtoken')
const { badRequest, customResponse } = require('../../shared/responseBuilder')

const tokenVerify = (token) => {
    var decoded = jwt.verify(token, process.env.SECRET)

    if (!decoded) {
        throw new Error('Invalid Token')
    }

    return decoded
}

const tokenVerifyMiddleware = async (req, res, next) => {
    const arr = typeof req.headers.authorization === 'string' ? req.headers.authorization.split(' ') : []

    const token = arr.length > 1 ? arr[1] : null

    // Verificar que venga el token
    if (!token) {
        badRequest(res, { message: 'No ha proveido token' })
        return
    }

    try {
        // Decodificar el token, si pasa el token es valido
        tokenVerify(token)

        next()
    } catch (error) {
        // console.error(error)
        customResponse(res, { name: 'error', message: 'El token es invalido o ha expirado' }, 401)
    }
}

module.exports.tokenVerifyMiddleware = tokenVerifyMiddleware
