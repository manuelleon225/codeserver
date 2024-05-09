import { Router } from "express";
import cartManager from "../../data/mongo/managers/Cart.manager.js";

const cartRouter = Router();

cartRouter.get("/", read);

async function read(req, res, next) {
    try {
      const { uid } = req.query;
      const cart= await cartManager.read(uid);
      return res.render("cart", { cart: cart });
      
    } catch (error) {
      return next(error);
    }
  }

export default cartRouter;
