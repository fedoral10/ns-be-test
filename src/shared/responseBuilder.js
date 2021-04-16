const getJsonBase = () => {
    return (
        {
            data: undefined,
            errors: undefined,
            code: undefined
        }
    )
}

module.exports.badRequest = (res, errors) => {
    let obj = getJsonBase()
    obj.errors = errors
    obj.code = 400
    res.status(400).send(obj)
}

module.exports.ok = (res, data) => {
    let obj = getJsonBase()
    obj.data = data
    obj.code = 200
    res.status(200).send(obj)
}

module.exports.internalServerError = (res, errors) => {
    let obj = getJsonBase()
    obj.errors = errors
    obj.code = 500
    res.status(500).send(obj)
}
