const fs = require("fs")
const crypto = require("crypto")
const path = "./app/files/products.json"

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
    async read() {
        try {
            let fileProducts = await fs.promises.readFile(this.path, "utf-8")
            fileProducts = JSON.parse(fileProducts)
            console.log(fileProducts);
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
                const error = new Error("No hay ningun producto registrado con ese id")
                throw error
            } else {
                fileProducts = fileProducts.filter((prod) => prod.id != id)
                fileProducts = JSON.stringify(fileProducts, null, 2)
                await fs.promises.writeFile(this.path, fileProducts)
                console.log(`Producto eliminado: \n ID: ${id}\n NOMBRE: ${prodFound.title}`);
                return fileProducts
            }
        } catch(error){
            throw error
        }
    }
}

async function test() {
    try {
        const productManager = new ProductManager(path)
        await productManager.create({
            title: "Camisa",
            photo: "camisa.jpg",
            category: "ropa",
            price: 9.99,
            stock: 10
        })
        await productManager.create({
            title: "Pantalon",
            photo: "pantalon.jpg",
            category: "ropa",
            price: 12.99,
            stock: 10
        })
        await productManager.create({
            title: "Horno",
            photo: "horno.jpg",
            category: "cocina",
            price: 59.99,
            stock: 5
        })
        await productManager.create({
            title: "Heladera",
            photo: "heladera.jpg",
            category: "cocina",
            price: 1199.00,
            stock: 7
        })
        await productManager.create({
            title: "Monitor ViewSonic",
            photo: "monitor.jpg",
            category: "tecnologia",
            price: 169.99,
            stock: 13
        })
        await productManager.read()
        // await productManager.readOne("123") // No hay ninguno con este ID, por lo que tira error
        console.log("\n Read One \n");
        await productManager.readOne("f26044d480b61db8861ded9c") // Debería arrojar: Camisa
        console.log("\n Read One \n");
        await productManager.destroy("69429aa5675d7e91ee1f8da0")
    } catch (error) {
        throw error
    }
}

test()