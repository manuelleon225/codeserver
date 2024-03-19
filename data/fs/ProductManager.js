import fs from "fs"
import crypto from "crypto"
const path = "./data/files/products.json"

class ProductManager {
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
            if (!data.title || !data.category || !data.price || !data.stock) {
                const error = new Error("ERROR: Faltan datos")
                throw error
            } else {
                const newProduct = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: data.title,
                    photo: data.photo || "pic_default.jpg",
                    category: data.category,
                    price: data.price,
                    stock: data.stock
                }
                let fileProducts = await fs.promises.readFile(this.path, "utf-8")
                fileProducts = JSON.parse(fileProducts)
                fileProducts.push(newProduct)
                fileProducts = JSON.stringify(fileProducts, null, 2)
                await fs.promises.writeFile(this.path, fileProducts)
                console.log("Product created");
            }
        } catch (error) {
            throw error
        }
    }
    async read(query) {
        try {
            let fileProducts = await fs.promises.readFile(this.path, "utf-8")
            // fileProducts = JSON.parse(fileProducts)
            fileProducts ? fileProducts = JSON.parse(fileProducts) : fileProducts; // pregunto si tiene algun dato el fileProducts para que no tire error el parse, ya que si no tiene datos no puede parsear nada y se rompe la app
            query ? fileProducts = fileProducts.filter((prod) => prod.category == query) : fileProducts
            return fileProducts
        } catch (error) {
            throw error
        }
    }
    async readOne(id) {
        try {
            let fileProducts = await fs.promises.readFile(this.path, "utf-8")
            fileProducts = JSON.parse(fileProducts)
            const prodFound = fileProducts.find((prod) => prod.id == id)
            if (!prodFound) {
                const error = new Error("No hay ningun producto registrado con ese id")
                throw error
            } else {
                console.log(prodFound);
                return prodFound
            }
        } catch (error) {
            throw error
        }
    }
    async destroy(id){
        try{
            let fileProducts = await fs.promises.readFile(this.path, "utf-8")
            fileProducts = JSON.parse(fileProducts)
            const prodFound = fileProducts.find((prod) => prod.id == id)
            if(!prodFound){
                const error = new Error("PRODUCT WITH THIS ID NOT FOUND")
                throw error
            } else {
                fileProducts = fileProducts.filter((prod) => prod.id != id)
                fileProducts = JSON.stringify(fileProducts, null, 2)
                await fs.promises.writeFile(this.path, fileProducts)
                console.log(`Product deleted: \n ID: ${id}\n NAME: ${prodFound.title}`);
                return fileProducts
            }
        } catch(error){
            throw error
        }
    }
}

const productManager = new ProductManager(path)
export default productManager


// await productManager.create({
//     title: "Camisa",
//     photo: "camisa.jpg",
//     category: "ropa",
//     price: 9.99,
//     stock: 10
// })
// await productManager.create({
//     title: "Pantalon",
//     photo: "pantalon.jpg",
//     category: "ropa",
//     price: 12.99,
//     stock: 10
// })
// await productManager.create({
//     title: "Horno",
//     photo: "horno.jpg",
//     category: "cocina",
//     price: 59.99,
//     stock: 5
// })
// await productManager.create({
//     title: "Heladera",
//     photo: "heladera.jpg",
//     category: "cocina",
//     price: 1199.00,
//     stock: 7
// })
// await productManager.create({
//     title: "Monitor ViewSonic",
//     photo: "monitor.jpg",
//     category: "tecnologia",
//     price: 169.99,
//     stock: 13
// })