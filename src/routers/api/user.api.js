// import UsersManager from "../../data/fs/UsersManager.js";
import UsersManager from "../../data/mongo/managers/Users.manager.js";
import { read, readOne, create, update, deleteUser } from "../../controllers/users.controller.js"
import CustomRouter from "../CustomRouter.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:uid", ["USER", "ADMIN"], readOne);
    this.create("/", ["PUBLIC"], create);
    this.update("/:uid", ["USER", "ADMIN"], update);
    this.delete("/:uid", ["USER", "ADMIN"], deleteUser);
  }
}


const usersRouter = new UsersRouter();

export default usersRouter.getRouter();
