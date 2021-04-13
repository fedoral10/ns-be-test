const jwt = require('jsonwebtoken')

const tokenVerify = (token) => {
    var decoded = jwt.verify(token, process.env.SECRET || '*UnReAl1998*')

    if (!decoded) {
        throw new Error('Invalid Token')
    }

    console.log(JSON.stringify(decoded))
    return decoded
}

const verifyGuest = (req, res, next) => {
    console.log(typeof req.headers.authorization)
    const arr = typeof req.headers.authorization === 'string' ? req.headers.authorization.split(' ') : []

    console.log(arr)
    const token = arr.length > 1 ? arr[1] : null
    console.log(token)

    if (!token) {
        badRequest(res, { message: 'No Identification Provided' })
        return
    }

    try {
        const verify = tokenVerify(token)
        res.idtoken = verify
        next()
    } catch (error) {
        // console.error(error)
        badRequest(res, error)
    }
}

module.exports.verifyGuest = verifyGuest
module.exports.pinSignIn = pinSignIn

module.exports.refreshToken = async (token, res) => {
    const info = jwt.decode(token)

    if (info) {
        const request = {
            headers: {
                pin: info.pin[0].pin
            }
        }

        return pinSignIn(request, res)
    }
}
