import { Router } from "express";
// import CartsManager from "../../data/fs/CartsManager.js";
import cartManager from "../../data/mongo/managers/Cart.manager.js";

const cartsRouter = Router()

cartsRouter.post("/", create)

cartsRouter.get("/", read)

cartsRouter.get("/:uid", readOne);

cartsRouter.put("/:uid", update)

cartsRouter.delete("/:uid", deleteCart)

async function read (req, res, next){
    try{
        const { user_id } = req.query
        if (user_id) {
            const allCarts = await cartManager.read({ user_id });
            if(allCarts.length !== 0){
                return res.status(200).json({
                    response: allCarts
                })
            } else {
                const error = new Error("NOT FOUND CART")
                error.statusCode = 404
                throw error
            }
        }
    } catch (err) {
        console.log(err);
        return next(err)
    }
}

async function readOne (req, res, next){
    try {
        const { uid } = req.params
        const cartById = await cartManager.readOne(uid)
        console.log("cartById ------>",cartById);
        if(cartById) {
            return res.status(200).json({
                response: cartById
            })
        } else {
            const error = new Error("NOT FOUND PRODUCT")
            error.statusCode = 404
            throw error
        }
    } catch (err) {
        return next(err)
    }
}

async function create(req, res, next){
    try {
        const data = req.body
        const newCart = await cartManager.create(data)
        return res.json({
            statusCode: 201,
            response: `CART ID: ${newCart.id}`,
            message: `Cart created: user_id: ${newCart.user_id} || product_id: ${newCart.product_id} || quantity: ${newCart.quantity} || state: ${newCart.state}`
        })
    } catch (error) {
        return next(error)
    }
}

async function update(req, res, next){
    try {
        const { uid } = req.params
        const data = req.body
        const cart = await cartManager.update(uid, data)
        return res.json({
            statusCode: 200,
            message: `Cart with ID: ${cart.id} updated`
        })
    } catch (error) {
        return next(error)
    }
}

async function deleteCart(req, res, next){
    try {
        const { uid } = req.params
        const deletedCart = await cartManager.destroy(uid);
        if (!deletedCart) {
            return res.json({ statusCode: 404, message: "Cart not found" });
        }
        return res.json({ statusCode: 200, response: deletedCart });
    } catch (error) {
        return next(error)
    }
}

export default cartsRouter
