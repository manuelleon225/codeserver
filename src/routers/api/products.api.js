// import productManager from "../../dao/fs/ProductManager.js";
import productManager from "../../dao/mongo/managers/Products.manager.js";
import { read, readOne, paginate, create, update, destroy } from "../../controllers/products.controller.js";
//../controllers/products.controller.js
import CustomRouter from "../CustomRouter.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid",["PUBLIC"], readOne);
    this.create("/real",["ADMIN"], create);
    this.update("/:pid",["ADMIN"], update);
    this.destroy("/:pid",["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();
