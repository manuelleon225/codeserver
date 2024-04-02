import crypto from "crypto"

class ProductManager {
    static #products = []
    create(data){
        try{
            if(!data.title){
                const error = new Error("ERROR: Faltan datos")
                throw error
            } else {
                const newProduct = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: data.title,
                    photo: data.photo || "pic_default.jpg",
                    category: data.category || "undefined",
                    price: data.price || 1,
                    stock: data.stock || 1
                }
                ProductManager.#products.push(newProduct)
                console.log("Product created (memory)");
            }
        } catch(error){
            throw error
        }
    }
    read(query){
        try{
            if(ProductManager.#products.length == 0){
                const error = new Error("No hay productos registrados")
                throw error
            } else {
                const products = ProductManager.#products.filter((prod) => prod.category == query)
                return ProductManager.#products
            }
        } catch(error){
            throw error
        }
    }
    readOne(id){
        try{
            const prodFound = ProductManager.#products.find((prod) => prod.id == id)
            if(!prodFound){
                const error = new Error("No hay ningun producto registrado con ese id")
                throw error
            } else {
                return prodFound
            }
        } catch(error){
            throw error
        }
    }
    destroy(id){
        try{
            const prodFound = ProductManager.#products.find((prod) => prod.id == id)
            if(!prodFound){
                const error = new Error("No hay ningun producto registrado con ese id")
                throw error
            } else {
                ProductManager.#products = ProductManager.#products.filter((prod) => prod.id != id)
                return ProductManager.#products
            }
        } catch(error){
            throw error
        }
    }
    update(pid, data){
        try {
            const productToUpdate = ProductManager.#products.find(prod => prod.id == pid) 
            if(productToUpdate){
                Object.assign(productToUpdate, data)
                return productToUpdate
            }
        } catch (error) {
            throw error
        } 
    }
}

// const gestorDeProductos = new ProductManager()
// gestorDeProductos.create({
//     title : "Camisa",
//     photo : "camisa.jpg",
//     category : "ropa",
//     price : 9.99,
//     stock : 10
// })
// gestorDeProductos.create({
//     title : "Pantalon",
//     photo : "pantalon.jpg",
//     category : "ropa",
//     price : 12.99,
//     stock : 10
// })
// gestorDeProductos.create({
//     title : "Horno",
//     photo : "horno.jpg",
//     category : "cocina",
//     price : 59.99,
//     stock : 5
// })
// gestorDeProductos.create({
//     title : "Heladera",
//     photo : "heladera.jpg",
//     category : "cocina",
//     price : 1199.00,
//     stock : 7
// })
// gestorDeProductos.create({
//     title : "Monitor ViewSonic",
//     photo : "monitor.jpg",
//     category : "tecnologia",
//     price : 169.99,
//     stock : 13
// })

// console.log(gestorDeProductos.read())
// // console.log(gestorDeProductos.readOne(1)) // Va a dar error por el random id, siempre cambia
// console.log(gestorDeProductos.destroy(2))
// console.log(gestorDeProductos.read()) // Fijarse q se haya eliminado el producto con id 2