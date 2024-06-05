import CustomRouter from "./CustomRouter.js";
import indexApiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";

class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", indexApiRouter)
        this.use("/", viewsRouter)
    }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter()