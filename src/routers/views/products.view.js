import productManager from "../../dao/mongo/managers/Products.manager.js";
import CustomError from "../../utils/errors/CustomError.js";
import errors from "../../utils/errors/Errors.js";
import { verifyToken } from "../../utils/token.util.js";
import CustomRouter from "../CustomRouter.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/search/:pid", ["PUBLIC"], readOne);
    this.read("/products/real", ["ADMIN", "PREM"], create);
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
      return CustomError.new(errors.notFound);
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
    let filter = {}
    if (category) {
      filter.category = category
    }
    let allProducts = await productManager.read(filter);
    let token = req.cookies["token"];
    if(token){
      let data = verifyToken(token);
      const { _id, role } = data;
      if (role === 2 || role === "PREM") {
        allProducts = allProducts.filter((prod) => prod.supplier_id === _id)
      }
    }
    allProducts.reverse()
    if (allProducts.length !== 0) {
      return res.render("product_register", {
        title: "Register a new product",
        allProducts,
      });
    } else {
      return CustomError.new(errors.notFound);
    }
  } catch (error) {
    return next(error);
  }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();
