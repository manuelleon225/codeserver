import { Router } from "express";
// import CartsManager from "../../data/fs/CartsManager.js";
import cartManager from "../../data/mongo/managers/Cart.manager.js";

const cartsRouter = Router()

cartsRouter.get("/", read)

//cartsRouter.post("/", create)

//cartsRouter.put("/:cid", update)

//cartsRouter.delete("/:cid", deleteCart)

async function read (req, res, next){
    try{
        const { user } = req.query
        const allCarts = await cartManager.read(user)
        if(allCarts.length !== 0){
            return res.status(200).json({
                response: allCarts
            })
        } else {
            const error = new Error("NOT FOUND CART")
            error.statusCode = 404
            throw error
        }
    } catch (err) {
        console.log(err);
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
        const { cid } = req.params
        const data = req.body
        const cart = await cartManager.update(cid, data)
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
        const { cid } = req.params
        let allCarts = await cartManager.read()
        const cartToDelete = allCarts.find((cart) => cart.id === cid)
        await cartManager.destroy(cid)
        return res.json({
            statusCode: 200,
            response: cartToDelete
        })
    } catch (error) {
        return next(error)
    }
}

export default cartsRouter
