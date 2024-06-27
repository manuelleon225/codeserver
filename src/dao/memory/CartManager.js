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
    paginate({ filter, opts }) {
        try {
          let filteredCarts = MemoryManager.#carts;
    
          if (filter) {
            filteredCarts = filteredCarts.filter((cart) => {
              return Object.keys(filter).every((key) => cart[key] === filter[key]);
            });
          }
    
          const total = filteredCarts.length;
          const page = opts.page || 1;
          const limit = opts.limit || 10;
          const offset = (page - 1) * limit;
    
          const paginatedCart = filteredCarts.slice(offset, offset + limit);
    
          return {
            docs: paginatedCart,
            totalDocs: total,
            limit: limit,
            page: page,
            totalPages: Math.ceil(total / limit),
            pagingCounter: offset + 1,
            hasPrevPage: page > 1,
            hasNextPage: page < Math.ceil(total / limit),
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
          };
        } catch (error) {
          throw error;
        }
      }
      readByEmail(email) {
        try {
          const cart = MemoryManager.#carts.find(
            (cart) => cart.email === email
          );
    
          if (!cart) {
            const error = new Error("Cart not found");
            error.statusCode = 404;
            throw error;
          }
    
          return cart;
        } catch (error) {
          throw error;
        }
      }
}