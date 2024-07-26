import userManager from "../dao/mongo/managers/Users.manager.js";
import errors from "../utils/errors/Errors.js";

async function isValidUser(req, res, next){
    try {
        const email = await userManager.readByEmail(req.body.email)
        if(!email){
            return CustomError.new(errors.auth)
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidUser