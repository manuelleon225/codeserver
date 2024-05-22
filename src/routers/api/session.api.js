import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";   

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  register
);
sessionsRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  login
);
sessionsRouter.post("/signout", signout);
sessionsRouter.get("/online", online)

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

async function login(req, res, next) {
    try {
      return res.json({
        statusCode: 201,
        messsage: "Logged In!",
        session: req.session
      });
    } catch (error) {
      return next(error);
    }
  }

async function signout(req, res, next) {
  try {
    if (req.session.email) {
      req.session.destroy();
    } else {
      const error = new Error("Not logged in");
      error.statusCode = 401;
      throw error;
    }
    return res.json({
      statusCode: 200,
      messsage: "Signed out!",
    });
  } catch (error) {
    return next(error);
  }
}

async function online(req, res, next) {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        messsage: "Is ONLINE!",
      });
    }
    const error = new Error("Is OFFLINE!");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}

export default sessionsRouter;
