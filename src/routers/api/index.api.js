import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";


const indexApiRouter = Router()

indexApiRouter.use("/products", productsRouter)
indexApiRouter.use("/users", usersRouter)


export default indexApiRouter