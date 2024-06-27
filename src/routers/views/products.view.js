import productManager from "../../dao/mongo/managers/Products.manager.js";
import CustomRouter from "../CustomRouter.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/search/:pid", ["PUBLIC"], readOne);
    this.read("/products/real", ["ADMIN"], create);
  }
}

async function read(req, res, next) {
  try {
    const { category } = req.query;
    let filter = {}
    if (category) {
      filter.category = category
    }
    const allProducts = await productManager.read(filter);
    if (allProducts.length !== 0) {
      return res.render("products", {
        title: "Products",
        allProducts,
      });
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const productById = await productManager.readOne(pid);
    return res.render("product_detail", { title: "DETAIL", productById });
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const { category } = req.query;
    const allProducts = await productManager.read(category);
    allProducts.reverse()
    if (allProducts.length !== 0) {
      return res.render("product_register", {
        title: "Register a new product",
        allProducts,
      });
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();
