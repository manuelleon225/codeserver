import CustomRouter from "./CustomRouter.js";
import indexApiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";
import {fork} from "child_process";

class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", indexApiRouter);
        this.use("/", viewsRouter);
        this.use("/fork", (req, res, next) => {
            const childProcess = fork("./src/utils.js/test.utils.js");
            childProcess.send("start");
            childProcess.on("message", (result) => {
              return res.json({ result });
            });
        });
    }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter()