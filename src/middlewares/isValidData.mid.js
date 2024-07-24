import CustomError from "../utils/errors/CustomError"
import errors from "../utils/errors/Errors"

async function isValidData(req, res, next){
    try {
        if(!req.body.email && !req.body.password){
            return CustomError.new(errors.missingData)
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidData