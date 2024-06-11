import cartManager from "../../data/mongo/managers/Cart.manager.js";
import CustomRouter from "../CustomRouter.js";

class CartRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], async function read(req, res, next) {
      try {
        const cart = await cartManager.read();
        console.log(cart, ' cart from read ');
        return res.render("cart", { title: "Cart", cart });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/:uid", ["USER", "ADMIN"], async function readOne(req, res, next) {
      try {
        const { uid } = req.params;
        const cart = await cartManager.read({user_id: uid});
        console.log(cart, ' cart id from readOne ');
        if (cart) {
          return res.render("cart", { title: "My cart", cart })
        } else {
          const error = new Error("NOT FOUND CART");
          error.statusCode = 404;
          throw error;
        }
      } catch (err) {
        return next(err);
      }
    });

  }
}

const cartRouter = new CartRouter();

export default cartRouter.getRouter();
