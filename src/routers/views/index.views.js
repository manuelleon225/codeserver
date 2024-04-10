import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.views.js";
import { title } from "process";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index",{title: "HOME"});
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;
