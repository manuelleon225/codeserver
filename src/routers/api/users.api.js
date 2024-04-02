import { Router } from "express";
import UsersManager from "../../data/fs/UsersManager.js";

const usersRouter = Router()

usersRouter.get("/", read)

usersRouter.get("/:uid", readOne)

usersRouter.post("/", create)

usersRouter.put("/:uid", update)

usersRouter.delete("/:uid", deleteUser)

async function read (req, res, next){
    try{
        const { role } = req.query
        const allUsers = await UsersManager.read(role)
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
}

async function readOne(req, res, next){
    try {
        const { uid } = req.params
        const userById = await UsersManager.readOne(uid)
        if(userById) {
            return res.status(200).json({
                response: userById
            })
        } else {
            const error = new Error("NOT FOUND USER")
            error.statusCode = 404
            throw error
        }
    } catch (err) {
        return next(err)
    }
}

async function create(req, res, next){
    try {
        const data = req.body
        console.log(data);
        const newUser = await UsersManager.create(data)
        return res.json({
            statusCode: 201,
            response: `USER ID: ${newUser.id}`,
            message: `User created: Email: ${newUser.email} || Photo: ${newUser.photo} || Role: ${newUser.role} || Password: ${newUser.password}`
        })
    } catch (error) {
        return next(error)
    }
}

async function update(req, res, next){
    try {
        const { uid } = req.params
        const data = req.body
        const useruct = await UsersManager.update(uid, data)
        return res.json({
            statusCode: 200,
            message: `User with ID: ${useruct.id} updated`
        })
    } catch (error) {
        return next(error)
    }
}

async function deleteUser(req, res, next){
    try {
        const { uid } = req.params
        let allUsers = await UsersManager.read()
        const usertToDelete = allUsers.find((user) => user.id === uid)
        await UsersManager.destroy(uid)
        return res.json({
            statusCode: 200,
            response: usertToDelete
        })
    } catch (error) {
        return next(error)
    }
}

export default usersRouter