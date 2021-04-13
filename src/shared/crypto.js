const { createHash } = require('crypto')
// var salt = Crypto.randomBytes(128).toString('base64');

module.exports.createHash = (message) => {
    const hash = createHash('sha256').update(message, 'utf8').digest('base64')
    // const hash = pbkdf2Sync(message, Buffer.from(SALT,'binary'), ITERATIONS, 64, 'sha512');

    return hash.toString('hex')
}

module.exports.isPasswordCorrect = (savedHash, passwordAttempt) => {
    const hash = createHash('sha256').update(passwordAttempt, 'utf8').digest('base64')
    // const hash = pbkdf2Sync(passwordAttempt, Buffer.from(SALT,'binary'), ITERATIONS,64,'sha512')
    console.log(savedHash)
    console.log(hash.toString('hex'))
    return savedHash === hash.toString('hex')
}
