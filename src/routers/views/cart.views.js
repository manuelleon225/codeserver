import cartManager from "../../dao/mongo/managers/Cart.manager.js";
import { verifyToken } from "../../utils/token.util.js";
import CustomRouter from "../CustomRouter.js";

class CartRouter extends CustomRouter {
  init() {
    this.read("/cart", ["ADMIN"], async function read(req, res, next) {
      try {
        const cart = await cartManager.read();
        return res.render("cart", { title: "Cart", cart });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/", ["USER", "ADMIN"], async function read(req, res, next) {
      try {
        const { user_id } = req.query;
        console.log(req.query, ' query ');
        const { _id: user_id_token } = verifyToken(req.cookies["token"])
        console.log(user_id_token, ' token _id');
        const cart = await cartManager.read({user_id:{_id: user_id}});
        if (cart) {
          if(user_id == user_id_token){
            return res.render("cart", { title: "My cart", cart })
          } else {
            return res.response403()
          }
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
