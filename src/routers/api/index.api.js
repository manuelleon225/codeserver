import { Router } from "express";
import productsRouter from "./products.api.js";

const indexApiRouter = Router()

indexApiRouter.use("/products", productsRouter)

export default indexApiRouter