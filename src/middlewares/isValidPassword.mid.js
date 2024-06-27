import userManager from "../dao/mongo/managers/Users.manager.js";
import { verifyHash } from "../utils/hash.util.js";

async function isValidPassword(req, res, next){
    try {
        const { email, password } = req.body
        const user = await userManager.readByEmail(email)
        const verify = verifyHash(password, user.password)
        if(!verify){
            const error = new Error("INVALID CREDENTIALS")
            error.statusCode = 401
            throw error
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidPassword