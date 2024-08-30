import productsRouter from "./products.api.js";
import usersRouter from "./user.api.js";
import cartsRouter from "./cart.api.js";
import ticketsRouter from "./tickets.api.js";
import sessionsRouter from "./session.api.js";
import CustomRouter from "../CustomRouter.js";
import cookiesRouter from "./cookies.api.js";
import paymentRouter from "./payment.api.js";

class IndexApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/cart", cartsRouter);
    this.use("/tickets", ticketsRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/payment", paymentRouter);
  }
}

const indexApiRouter = new IndexApiRouter()

export default indexApiRouter.getRouter()