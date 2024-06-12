import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, deleteCart } from "../../controllers/carts.controller.js";

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:uid", ["PUBLIC"], readOne);
    this.update("/:uid", ["PUBLIC"], update);
    this.delete("/:uid", ["PUBLIC"], deleteCart);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();
