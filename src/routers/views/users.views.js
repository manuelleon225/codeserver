import { Router } from "express";
import UsersManager from "../../data/fs/UsersManager.js"

const usersRouter = Router();

usersRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", { title: "REGISTER" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
    try {
      const { uid } = req.params;
      const users = await UsersManager.readOne(uid);
      return res.render("users", { title: "REAL", users });
    } catch (error) {
      return next(error);
    }
  });

export default usersRouter;
