import cartManager from "../../data/mongo/managers/Cart.manager.js";
import CustomRouter from "../CustomRouter.js";

class CartRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], async function read(req, res, next) {
      try {
        const { uid } = req.query;
        const cart = await cartManager.read(uid);
        console.log(cart);
        return res.render("cart", { title: "Cart", cart });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const cartRouter = new CartRouter();

export default cartRouter.getRouter();
