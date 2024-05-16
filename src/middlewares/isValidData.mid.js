
async function isValidData(req, res, next){
    try {
        if(!req.body.email && !req.body.password){
            const error = new Error("MISSING DATA")
            error.statusCode = 400
            throw error
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidData