import CustomRouter from "./CustomRouter.js";
import indexApiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";
import { fork } from "child_process";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", indexApiRouter);
    this.use("/", viewsRouter);
    this.use("/fork", (req, res, next) => {
      try {
        const childProcess = fork("./src/processes/test.js");
        childProcess.send("start");
        childProcess.on("message", (result) => {
          return res.json({ result });
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/simplex", ["PUBLIC"], (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/complex", ["PUBLIC"], (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 2000000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();
