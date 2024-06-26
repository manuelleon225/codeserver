import userManager from "../dao/mongo/managers/Users.manager.js";

async function isValidUser(req, res, next){
    try {
        const email = await userManager.readByEmail(req.body.email)
        if(!email){
            const error = new Error("BAD AUTH")
            error.statusCode = 401
            throw error
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export default isValidUser