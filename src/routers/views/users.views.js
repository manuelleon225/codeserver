import { Router } from "express";
import UsersManager from "../../data/fs/UsersManager.fs.js"

const usersRouter = Router();

usersRouter.get("/",(req,res,next)=>{
    try {
        const users = UsersManager.read()
        return res.render("users", {users})
    } catch (error) {
        return next(error)
    }
})

export default usersRouter;
