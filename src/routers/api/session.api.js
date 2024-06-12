import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.js";
import { register, login, online, signout } from "../../controllers/sessions.controller.js"

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register"),
      async function register(req, res, next) {
        try {
          return res.json({
            statusCode: 201,
            messsage: "Registered",
          });
        } catch (error) {
          return next(error);
        }
      }
    );
    this.create(
      "/login",
      ["PUBLIC"],
      passportCb("login"),
      async function login(req, res, next) {
        try {
          console.log(req.user);
          return res
          .cookie("token", req.user.token, {signedCookie: true})
          .json({
            statusCode: 201,
            messsage: "Logged In!",
            token: req.user.token
          });
        } catch (error) {
          return next(error);
        }
      }
    );
    this.create(
      "/", 
      ["USER", "ADMIN"],
      passportCb("jwt"),
      async function online(req, res, next) {
      try {
        if (req.user.online) {
          console.log(req.user);
          return res.json({
            statusCode: 200,
            messsage: "Is ONLINE!",
            session: req.user
          });
        }
        const error = new Error("Is OFFLINE!");
        error.statusCode = 401;
        throw error;
      } catch (error) {
        return next(error);
      }
    })
    this.create("/signout", 
    ["USER", "ADMIN"],
    async function signout(req, res, next) {
      try {
        console.log(req.user, ' onli ');
        if (req.cookies["token"]) {
          return res
          .clearCookie("token")
          .json({
            statusCode: 200,
            messsage: "Signed out!",
          });
        } 
          const error = new Error("Not logged in");
          error.statusCode = 401;
          throw error;
        
      } catch (error) {
        return next(error);
      }
    });
  }
}

const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter()