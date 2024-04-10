import { Router } from "express";
import indexApiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";

const indexRouter = Router();

indexRouter.use("/api", indexApiRouter);
indexRouter.use("/", viewsRouter);

export default indexRouter;