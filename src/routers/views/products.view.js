import { Router } from "express";
import productManager from "../../data/mongo/managers/Products.manager.js";

const productsRouter = Router();

productsRouter.get("/", read);

productsRouter.get("/search/:pid", readOne);

productsRouter.get("/products/real", create);

async function read(req, res, next) {
  try {
    const { category } = req.query;
    let filter = {}
    if (category) {
      filter.category = category
    }
    const allProducts = await productManager.read(filter);
    console.log(allProducts);
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
    return res.render("product_detail", { title: "DETAIL", productById});
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const { category } = req.query;
    const allProducts = await productManager.read(category);
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

export default productsRouter;
