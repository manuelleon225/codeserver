// import UsersManager from "../../dao/fs/UsersManager.js";
import UsersManager from "../../dao/mongo/managers/Users.manager.js";
import { read, readOne, create, update, destroy } from "../../controllers/users.controller.js"
import CustomRouter from "../CustomRouter.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:uid", ["USER", "ADMIN"], readOne);
    this.create("/", ["PUBLIC"], create);
    this.update("/:uid", ["USER", "ADMIN"], update);
    this.destroy("/:uid", ["USER", "ADMIN"], destroy);
  }
}

const usersRouter = new UsersRouter();

export default usersRouter.getRouter();
