import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.views.js";

const viewsRouter = Router();

viewsRouter.use("/", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
