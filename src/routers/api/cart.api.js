import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, deleteCart, readByUserId } from "../../controllers/carts.controller.js";

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN", "PREM"], create);
    this.read("/cart", ["USER", "ADMIN", "PREM"], read);
    this.read("/:cid", ["USER", "ADMIN", "PREM"], readOne);
    this.read("/", ["USER", "ADMIN", "PREM"], readByUserId);
    this.update("/:cid", ["USER", "ADMIN", "PREM"], update);
    this.destroy("/:cid", ["USER", "ADMIN", "PREM"], deleteCart);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();
