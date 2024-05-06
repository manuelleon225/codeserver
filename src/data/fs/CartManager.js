import fs from "fs"
import crypto from "crypto"
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
                const error = new Error("ERROR: Faltan datos")
                throw error
            } else {
                const newCart = {
                  id: data.id || crypto.randomBytes(12).toString("hex"),
                  user_id: data.id || crypto.randomBytes(12).toString("hex"),
                  cartuct_id: data.id || crypto.randomBytes(12).toString("hex"),
                  quantity: data.id || 1,
                  state: data.id || "reserved",
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
            query ? fileCarts = fileCarts.filter((cart) => cart.category == query) : fileCarts
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
                const error = new Error("No hay ningun cart registrado con ese id")
                throw error
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
                const error = new Error("CART WITH THIS ID NOT FOUND")
                throw error
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
}

const cartManager = new CartManager(path)
export default cartManager