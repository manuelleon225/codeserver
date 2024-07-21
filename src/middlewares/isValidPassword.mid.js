import userManager from "../dao/mongo/managers/Users.manager.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/Errors.js";
import { verifyHash } from "../utils/hash.util.js";

async function isValidPassword(req, res, next){
    try {
        const { email, password } = req.body
        const user = await userManager.readByEmail(email)
        const verify = verifyHash(password, user.password)
        if(!verify){
            return new CustomError(errors.invalid)
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidPassword