import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.js";
import { register, login, online, signout, sendMail, verifyCode, newPassword } from "../../controllers/sessions.controller.js"

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"),login );
    this.create("/recover-password", ["USER", "ADMIN", "PREM"], passportCb("send_mail"), sendMail);
    this.create("/verify_code", ["USER", "ADMIN", "PREM"], passportCb("verify_code"), verifyCode);
    this.update("/new_password", ["USER", "ADMIN", "PREM"], passportCb("new_password"), newPassword);
    this.create("/online", ["USER", "ADMIN", "PREM"], passportCb("jwt"), online);
    this.create("/signout", ["USER", "ADMIN", "PREM"],signout );
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter()