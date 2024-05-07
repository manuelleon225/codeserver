import crypto from "crypto"

class CartManager {
    static #carts = []
    create(data){
        try{
            if(!data.title){
                const error = new Error("ERROR: Faltan datos")
                throw error
            } else {
                const newCart = {
                    id: crypto.randomBytes(12).toString("hex"),
                    user_id: data.id || crypto.randomBytes(12).toString("hex"),
                    product_id: data.id || crypto.randomBytes(12).toString("hex"),
                    quantity: data.id || 1,
                    state: data.id || "reserved",
                }
                CartManager.#carts.push(newCart)
                console.log("Product created (memory)");
            }
        } catch(error){
            throw error
        }
    }
    read(){
        try{
            if(CartManager.#carts.length == 0){
                const error = new Error("No hay carritos registrados")
                throw error
            } else {
                //const carts = CartManager.#carts;
                return CartManager.#carts
            }
        } catch(error){
            throw error
        }
    }
    readOne(id){
        try{
            const cartFound = CartManager.#carts.find((cart) => cart.id == id)
            if(!cartFound){
                const error = new Error("No hay ningun carrito registrado con ese id")
                throw error
            } else {
                return cartFound
            }
        } catch(error){
            throw error
        }
    }
    destroy(id){
        try{
            const cartFound = CartManager.#carts.find((cart) => cart.id == id)
            if(!cartFound){
                const error = new Error("No hay ningun carrito registrado con ese id")
                throw error
            } else {
                CartManager.#carts = CartManager.#carts.filter((cart) => cart.id != id)
                return CartManager.#carts
            }
        } catch(error){
            throw error
        }
    }
    update(uid, data){
        try {
            const cartToUpdate = CartManager.#carts.find(cart => cart.id == uid) 
            if(cartToUpdate){
                Object.assign(cartToUpdate, data)
                return cartToUpdate
            }
        } catch (error) {
            throw error
        } 
    }
}