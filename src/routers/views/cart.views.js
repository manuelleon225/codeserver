import { Router } from "express";
import cartManager from "../../data/mongo/managers/Cart.manager.js";

const cartRouter = Router();

cartRouter.get("/", read);

async function read(req, res, next) {
    try {
      const { category } = req.query;
      const cart= await cartManager.read(category);
      if (cart.length !== 0) {
        console.log("carts ------>",cart);
        return res.render("cart", { cart: cart });
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
