import { Router } from "express";
import cartManager from "../../data/fs/CartManager.js";

const cartRouter = Router();

cartRouter.get("/", read);

async function read(req, res, next) {
    try {
      const { category } = req.query;
      const allCarts = await cartManager.read(category);
      if (allCarts.length !== 0) {
        return res.render("cart", {
          allCarts,
        });
      } else {
        const error = new Error("NOT FOUND CART");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

export default cartRouter;
