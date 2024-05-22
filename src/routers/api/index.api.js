import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./user.api.js";
import cartsRouter from "./cart.api.js";
import ticketsRouter from "./tickets.api.js";
import sessionsRouter from "./session.api.js";

const indexApiRouter = Router()

indexApiRouter.use("/products", productsRouter)
indexApiRouter.use("/users", usersRouter)
indexApiRouter.use("/cart", cartsRouter)
indexApiRouter.use("/tickets", ticketsRouter)
indexApiRouter.use("/sessions", sessionsRouter)

export default indexApiRouter