import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.js";
import { register, login, online, signout } from "../../controllers/sessions.controller.js"

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"),login );
    this.create("/online", ["USER", "ADMIN"], passportCb("jwt"), online);
    this.create("/signout", ["USER", "ADMIN"],signout );
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter()