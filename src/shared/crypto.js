const { createHash, randomBytes, scrypt } = require('crypto')

module.exports.hashMessage = (message) => {
    const hash = createHash('sha256').update(message, 'utf8').digest('base64')

    return hash.toString('hex')
}

module.exports.isPasswordCorrect = (savedHash, passwordAttempt) => {
    const hash = createHash('sha256').update(passwordAttempt, 'utf8').digest('base64')
    
    return savedHash === hash.toString('hex')
}

const hashMessageSalted = (message, savedSalt) => {
    return new Promise((resolve, reject) => {
        const salt = savedSalt || randomBytes(128).toString('hex')

        scrypt(message, salt, 128, (err, derivedKey) => {
            if (err) reject(err)
            resolve({ salt, hash: derivedKey.toString('hex') })
        })
    })
}

module.exports.hashMessageSalted = async (message) => {
    const hashed = await hashMessageSalted(message)
    return `${hashed.salt}:${hashed.hash}`
}

module.exports.isPasswordCorrectSalted = async (savedHash, passwordAttempt) => {
    const split = savedHash.split(':')
    const hashed = await hashMessageSalted(passwordAttempt, split[0])
    
    return `${hashed.salt}:${hashed.hash}` === savedHash
}
