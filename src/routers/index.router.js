import { Router } from "express";
import indexApiRouter from "./api/index.api.js";

const indexRouter = Router()

indexRouter.use("/api", indexApiRouter)

export default indexRouter