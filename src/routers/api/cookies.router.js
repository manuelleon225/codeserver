import { Router, response } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", async (req, res, next) => {
  let query = "";
  try {
    if (req.query.nombre) {
      query = req.query;
    }
    return res
      .cookie("clave", "valor", { maxAge: 10000 })
      .json({ message: query });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/get", async (req, res, next) => {
  try {
    const cookieGuardada = req.cookies;
    return res.json({ cookieGuardada });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/clear_token", async (req, res, next) => {
  try {
    return res.clearCookie("token").json({ response: "token deleted" });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;