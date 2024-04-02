import express from "express";
import usersManager from "./src/data/fs/UsersManager.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import indexRouter from "./src/routers/index.router.js";

const server = express()
const port = 8080
const ready = () => (console.log("server ready on port " + port))

server.listen(port, ready)

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use("/", indexRouter)
server.use(errorHandler)
server.use(pathHandler)

//USERS//

server.get("/api/users", async (req, res, next) => {
    try{
        const { role } = req.query
        const allUsers = await usersManager.read(role)
        if(allUsers.length !== 0){
            return res.status(200).json({
                response: allUsers
            })
        } else {
            const error = new Error("NOT FOUND USERS")
            error.statusCode = 404
            throw error
        }
    } catch (err) {
        return next(err)
    }
})

server.get("/api/users/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params
        const usersById = await usersManager.readOne(uid)
        if(usersById) {
            return res.status(200).json({
                response: usersById
            })
        } else {
            const error = new Error("NOT FOUND USER")
            error.statusCode = 404
            throw error
        }
    } catch (err) {
        return next(err)
    }
})