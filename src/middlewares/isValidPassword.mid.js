import userManager from "../data/mongo/managers/Users.manager.js";

async function isValidPassword(req, res, next){
    try {
        const { email, password } = req.body
        const formPassword = password
        const user = await userManager.readByEmail(email)
        const mongoPassword = user.password
        if(formPassword !== mongoPassword){
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