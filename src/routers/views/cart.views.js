import cartManager from "../../data/mongo/managers/Cart.manager.js";
import CustomRouter from "../CustomRouter.js";

class CartRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], async function read(req, res, next) {
      try {
        const cart = await cartManager.read();
        console.log(cart);
        return res.render("cart", { title: "Cart", cart });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/:uid", ["USER"], async function readOne(req, res, next) {
      try {
        const { uid } = req.query;
        const cartById = await cartManager.readOne(uid);
        console.log(cartById);
        if (cartById) {
          return res.render("cart", { title: "My cart", cartById })
        } else {
          const error = new Error("NOT FOUND PRODUCT");
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
