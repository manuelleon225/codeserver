import { Router } from "express";
import productManager from "../../data/fs/ProductManager.js";

const productsRouter = Router();

productsRouter.get("/", read);

productsRouter.get("/search/:pid", readOne)

productsRouter.get("/products/real", create)

async function read (req, res, next){
    try {
      const { category } = req.query;
      const allProducts = await productManager.read(category);
      if (allProducts.length !== 0) {
        return res.render("products", {
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

async function readOne (req, res, next){
    try {
        const { pid } = req.params
        const productById = await productManager.readOne(pid)
        if(productById) {
            return res.render("product_detail", {productById})
        } else {
            const error = new Error("NOT FOUND PRODUCT")
            error.statusCode = 404
            throw error
        }
    } catch (err) {
        return next(err)
    }
}

async function create (req, res, next){
  try {
    const { category } = req.query;
    const allProducts = await productManager.read(category);
    if (allProducts.length !== 0) {
      return res.render("product_register", {
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
