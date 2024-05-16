import { Router } from "express";
import userManager from "../../data/mongo/managers/Users.manager.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";

const sessionsRouter = Router()

sessionsRouter.post("/register", isValidEmail, isValidData, register)
sessionsRouter.post("/login", isValidUser, isValidPassword, login)
sessionsRouter.post("/signout", signout)

async function signout(req, res, next){
    try {
        if(req.session.email){
            req.session.destroy()
        } else {
            const error = new Error("Not logged in")
            error.statusCode = 401
            throw error
        }
        return res.json({
            statusCode: 200,
            messsage: "Signed out!"
        })
    } catch (error) {
        return next(error)
    }
}

async function login(req, res, next){
    try {
        if(req.session.email){
            const error = new Error("Already logged in")
            error.statusCode = 401
            throw error
        }
        const email = req.body.email
        const user = await userManager.readByEmail(email)
        req.session.email = email
        req.session.role = user.role
        return res.json({
            statusCode: 201,
            messsage: "Logged In!"
        })
    } catch (error) {
        return next(error)
    }
}

async function register(req, res, next){
    try {
        await userManager.create(req.body)
        return res.json({
            statusCode: 201,
            messsage: "Registered"
        })
    } catch (error) {
        return next(error)
    }
}

export default sessionsRouter