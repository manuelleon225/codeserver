import { Router } from "express";
import cartManager from "../../data/mongo/managers/Cart.manager.js";

const cartRouter = Router();

cartRouter.get("/", read);

async function read(req, res, next) {
    try {
      const { uid } = req.query;
      const cart = await cartManager.read(uid);
      console.log(cart);
      return res.render("cart", { title: "Cart", cart });
    } catch (error) {
      return next(error);
    }
  }

export default cartRouter;
