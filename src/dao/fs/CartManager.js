import fs from "fs"
import crypto from "crypto"
import CustomError from "../../utils/errors/CustomError"
import errors from "../../utils/errors/Errors"
const path = "./src/data/files/carts.json"

class CartManager {
    constructor(path) {
        this.path = path,
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log("File created");
        }
        return fs.promises.readFile(this.path, "utf-8")
    }
    async create(data) {
        try {
            if (!data.title) {
                return CustomError.new(errors.missingData);
            } else {
                const newCart = {
                  id: data.id || crypto.randomBytes(12).toString("hex"),
                  user_id: data.user_id || crypto.randomBytes(12).toString("hex"),
                  product_id: data.product_id || crypto.randomBytes(12).toString("hex"),
                  quantity: data.quantity || 1,
                  state: data.state || "reserved",
                }
                let fileCarts = await fs.promises.readFile(this.path, "utf-8")
                fileCarts = JSON.parse(fileCarts)
                fileCarts.push(newCart)
                fileCarts = JSON.stringify(fileCarts, null, 2)
                await fs.promises.writeFile(this.path, fileCarts)
                console.log("Cart created (File System)");
                return newCart
            }
        } catch (error) {
            throw error
        }
    }
    async read(query) {
        try {
            let fileCarts = await fs.promises.readFile(this.path, "utf-8")
            // fileCarts = JSON.parse(fileCarts)
            fileCarts ? fileCarts = JSON.parse(fileCarts) : fileCarts; // pregunto si tiene algun dato el fileCarts para que no tire error el parse, ya que si no tiene datos no puede parsear nada y se rompe la app
            query ? fileCarts = fileCarts.filter((cart) => cart.user_id === query) : fileCarts
            return fileCarts
        } catch (error) {
            throw error
        }
    }
    async readOne(id) {
        try {
            let fileCarts = await fs.promises.readFile(this.path, "utf-8")
            fileCarts = await JSON.parse(fileCarts)
            const cartFound = await fileCarts.find((cart) => cart.id == id)
            if (!cartFound) {
                return CustomError.new(errors.notFound)
            } else {
                return cartFound
            }
        } catch (error) {
            throw error
        }
    }
    async destroy(id){
        try{
            let fileCarts = await fs.promises.readFile(this.path, "utf-8")
            fileCarts = JSON.parse(fileCarts)
            const cartFound = fileCarts.find((cart) => cart.id == id)
            if(!cartFound){
                return CustomError.new(errors.notFound)
            } else {
                fileCarts = fileCarts.filter((cart) => cart.id != id)
                fileCarts = JSON.stringify(fileCarts, null, 2)
                await fs.promises.writeFile(this.path, fileCarts)
                console.log(`Cart deleted: \n ID: ${id}`);
                return fileCarts
            }
        } catch(error){
            throw error
        }
    }
    async update(pid, data){
        try {
            let allCarts = await this.read()
            const cartToUpdate = allCarts.find(cart => cart.id == pid) // El find tiene una mutabilidad que permite modificar el objeto y que el cambio se aplique al array de donde se ENCONTRO este objeto
            Object.assign(cartToUpdate, data) // Actualiza los campos del cartucto con los nuevos valores traidos por el body
            console.log(cartToUpdate);
            allCarts = JSON.stringify(allCarts, null, 2)
            await fs.promises.writeFile(this.path, allCarts)
            return cartToUpdate
        } catch (error) {
            throw error
        } 
    }
    async paginate({ filter, opts }) {
        try {
          let fileCarts = await fs.promises.readFile(this.path, "utf-8");
          fileCarts = fileCarts ? JSON.parse(fileCarts) : []; 
    
          if (filter) {
            fileCarts = fileCarts.filter((cart) => {
              return Object.keys(filter).every((key) => cart[key] === filter[key]);
            });
          }
    
          const total = fileCarts.length;
          const page = opts.page || 1;
          const limit = opts.limit || 10;
          const offset = (page - 1) * limit;
    
          const paginatedCart = fileCarts.slice(offset, offset + limit);
    
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
            nextPage: page < Math.ceil(total / limit) ? page + 1 : null
          };
        } catch (error) {
          throw error;
        }
      }    
      async readByEmail(email) {
        try {
          let fileCarts = await fs.promises.readFile(this.path, "utf-8");
          fileCarts = fileCarts ? JSON.parse(fileCarts) : [];
    
          const cart = fileCarts.find((prod) => prod.email === email);

          if (!cart) {
            return CustomError.new(errors.notFound);
          }
    
          return cart;
        } catch (error) {
          throw error;
        }
      }
}

const cartManager = new CartManager(path)
export default cartManager