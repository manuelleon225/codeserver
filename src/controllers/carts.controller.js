import cartManager from "../data/mongo/managers/Cart.manager.js";


async function read(req, res, next) {
    try {
      const allCarts = await cartManager.read();
      if (allCarts.length !== 0) {
        return res.response200(allCarts)
      } else {
        const error = new Error("NOT FOUND CART");
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
  
  async function readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const cartById = await cartManager.readOne(uid);
      if (cartById) {
        return res.response200(cartById)
      } else {
        const error = new Error("NOT FOUND PRODUCT");
        error.statusCode = 404;
        throw error;
      }
    } catch (err) {
      return next(err);
    }
  }
  
  async function create(req, res, next) {
    try {
      const data = req.body;
      const newCart = await cartManager.create(data);
      return res.response201(`Cart created with ID: ${newCart.id} || user_id: ${newCart.user_id} || product_id: ${newCart.product_id} || quantity: ${newCart.quantity} || state: ${newCart.state}`)
    } catch (error) {
      return next(error);
    }
  }
  
  async function update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const cart = await cartManager.update(uid, data);
      return cart ? res.response200(`Cart with ID: ${cart.id} updated`) : res.response404()
    } catch (error) {
      return next(error);
    }
  }
  
  async function deleteCart(req, res, next) {
    try {
      const { uid } = req.params;
      const deletedCart = await cartManager.destroy(uid);
      return deletedCart ? res.response200(`Cart: ${deletedCart} deleted`) : res.response404()
    } catch (error) {
      return next(error);
    }
  }

  export { create, read, readOne, update, deleteCart};
  