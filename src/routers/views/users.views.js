//import UsersManager from "../../dao/fs/UsersManager.js"
import UsersManager from "../../dao/mongo/managers/Users.manager.js";
import CustomRouter from "../CustomRouter.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/register", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("register", { title: "Register" });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/login", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("login", { title: "Login" });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/recover-password", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("recover_password", { title: "Recover your password" })
      } catch (error) {
        return next(error)
      }
    });
    this.read("/:uid", ["USER", "ADMIN", "PREM"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const users = await UsersManager.readOne(uid);
        return res.render("users", { title: "User profile", users });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const usersRouter = new UsersRouter();

export default usersRouter.getRouter();
