import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, deleteCart, readByUserId } from "../../controllers/carts.controller.js";

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/cart", ["PUBLIC"], read);
    this.read("/:cid", ["PUBLIC"], readOne);
    this.read("/", ["PUBLIC"], readByUserId);
    this.update("/:cid", ["PUBLIC"], update);
    this.destroy("/:cid", ["PUBLIC"], deleteCart);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();
