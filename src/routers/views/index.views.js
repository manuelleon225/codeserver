import productsRouter from "./products.view.js";
import usersRouter from "./users.views.js";
import cartRouter from "./cart.views.js";
import CustomRouter from "../CustomRouter.js";

class ViewsRouter extends CustomRouter {
  init() {
    this.use("/", productsRouter);
    this.use("/users", usersRouter);
    this.use("/cart", cartRouter);
  }
}

const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();
