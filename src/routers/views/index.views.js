import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.views.js";
import cartRouter from "./cart.views.js";

const viewsRouter = Router();

viewsRouter.use("/", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/cart", cartRouter);

export default viewsRouter;
