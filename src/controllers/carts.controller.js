import cartManager from "../dao/mongo/managers/Cart.manager.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/Errors.js";


async function read(req, res, next) {
    try {
      const allCarts = await cartManager.read();
      if (allCarts.length !== 0) {
        return res.response200(allCarts)
      } else {
        return CustomError.new(errors.notFound);
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
  
  async function readOne(req, res, next) {
    try {
      const { cid } = req.params;
      const cartById = await cartManager.readOne(cid);
      if (cartById) {
        return res.response200(cartById)
      } else {
        return CustomError.new(errors.notFound);
      }
    } catch (err) {
      return next(err);
    }
  }

  async function readByUserId(req, res, next) {
    try {
      const { user_id } = req.query;
      const cartById = await cartManager.read({user_id:{_id: user_id}});
      if (cartById) {
        return res.response200(cartById)
      } else {
        return CustomError.new(errors.notFound);
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
      const { cid } = req.params;
      const deletedCart = await cartManager.destroy(cid);
      return deletedCart ? res.response200(`Cart: ${deletedCart} deleted`) : res.response404()
    } catch (error) {
      return next(error);
    }
  }
  

  export { create, read, readOne, readByUserId, update, deleteCart};
  