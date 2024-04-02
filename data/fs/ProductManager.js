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


// 20 PRODUCTOS NUEVOS ABAJO
// async function test (){
//     await productManager.create({
//         title: "Camisa de algodón a rayas",
//         photo: "/camisa-rayas.jpg",
//         category: "Ropa",
//         price: 29.99,
//         stock: 50
//     })
    
//     await productManager.create({
//         title: "Zapatillas deportivas para correr",
//         photo: "/zapatillas-corredor.jpg",
//         category: "Calzado",
//         price: 49.99,
//         stock: 40
//     })
    
//     await productManager.create({
//         title: "Mochila resistente al agua",
//         photo: "/mochila-resistente.jpg",
//         category: "Accesorios",
//         price: 39.99,
//         stock: 30
//     })
    
//     await productManager.create({
//         title: "Reloj de pulsera elegante",
//         photo: "/reloj-elegante.jpg",
//         category: "Accesorios",
//         price: 69.99,
//         stock: 25
//     })
    
//     await productManager.create({
//         title: "Auriculares inalámbricos Bluetooth",
//         photo: "/auriculares-bluetooth.jpg",
//         category: "Electrónica",
//         price: 59.99,
//         stock: 35
//     })
    
//     await productManager.create({
//         title: "Pantalones vaqueros ajustados",
//         photo: "/pantalones-vaqueros.jpg",
//         category: "Ropa",
//         price: 34.99,
//         stock: 45
//     })
    
//     await productManager.create({
//         title: "Botella de agua deportiva",
//         photo: "/botella-deportiva.jpg",
//         category: "Accesorios",
//         price: 14.99,
//         stock: 55
//     })
    
//     await productManager.create({
//         title: "Chaqueta ligera impermeable",
//         photo: "/chaqueta-impermeable.jpg",
//         category: "Ropa",
//         price: 79.99,
//         stock: 20
//     })
    
//     await productManager.create({
//         title: "Mochila para portátil",
//         photo: "/mochila-portatil.jpg",
//         category: "Accesorios",
//         price: 49.99,
//         stock: 30
//     })
    
//     await productManager.create({
//         title: "Teléfono inteligente de última generación",
//         photo: "/telefono-inteligente.jpg",
//         category: "Electrónica",
//         price: 699.99,
//         stock: 15
//     })
    
//     await productManager.create({
//         title: "Gorra de béisbol ajustable",
//         photo: "/gorra-beisbol.jpg",
//         category: "Accesorios",
//         price: 19.99,
//         stock: 40
//     })
    
//     await productManager.create({
//         title: "Sudadera con capucha unisex",
//         photo: "/sudadera-capucha.jpg",
//         category: "Ropa",
//         price: 44.99,
//         stock: 25
//     })
    
//     await productManager.create({
//         title: "Bolsa de viaje resistente",
//         photo: "/bolsa-viaje.jpg",
//         category: "Accesorios",
//         price: 59.99,
//         stock: 35
//     })
    
//     await productManager.create({
//         title: "Bufanda de lana suave",
//         photo: "/bufanda-lana.jpg",
//         category: "Ropa",
//         price: 24.99,
//         stock: 50
//     })
    
//     await productManager.create({
//         title: "Botines de cuero elegantes",
//         photo: "/botines-cuero.jpg",
//         category: "Calzado",
//         price: 89.99,
//         stock: 20
//     })
    
//     await productManager.create({
//         title: "Cámara digital compacta",
//         photo: "/img/camara-digital.jpg",
//         category: "Electrónica",
//         price: 199.99,
//         stock: 10
//     })
    
//     await productManager.create({
//         title: "Cinturón de cuero genuino",
//         photo: "/img/cinturon-cuero.jpg",
//         category: "Accesorios",
//         price: 29.99,
//         stock: 45
//     })
    
//     await productManager.create({
//         title: "Camiseta de algodón básica",
//         photo: "/img/camiseta-algodon.jpg",
//         category: "Ropa",
//         price: 14.99,
//         stock: 60
//     })
    
//     await productManager.create({
//         title: "Maletín ejecutivo de cuero",
//         photo: "/img/maletin-cuero.jpg",
//         category: "Accesorios",
//         price: 129.99,
//         stock: 15
//     })
    
//     await productManager.create({
//         title: "Gafas de sol polarizadas",
//         photo: "/gafas-sol.jpg",
//         category: "Accesorios",
//         price: 39.99,
//         stock: 30
//     })
// }

// test()