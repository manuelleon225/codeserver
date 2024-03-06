class ProductManager {
    static #products = []
    create(data){
        const product = {
            id : ProductManager.#products.length === 0 ? 1: ProductManager.#products[ProductManager.#products.length -1].id+1,
            title : data.title,
            photo : data.photo,
            category : data.category,
            price : data.price,
            stock : data.stock
        }
        ProductManager.#products.push(product)
        console.log("product created");
    }
    read(){
        return ProductManager.#products
    }
}

const gestorDeProductos = new ProductManager()
gestorDeProductos.create({
    title : "Camisa",
    photo : "camisa.jpg",
    category : "ropa",
    price : 9.99,
    stock : 10
})
gestorDeProductos.create({
    title : "Pantalon",
    photo : "pantalon.jpg",
    category : "ropa",
    price : 12.99,
    stock : 10
})
gestorDeProductos.create({
    title : "Horno",
    photo : "horno.jpg",
    category : "cocina",
    price : 59.99,
    stock : 5
})
gestorDeProductos.create({
    title : "Heladera",
    photo : "heladera.jpg",
    category : "cocina",
    price : 1199.00,
    stock : 7
})
gestorDeProductos.create({
    title : "Monitor ViewSonic",
    photo : "monitor.jpg",
    category : "tecnologia",
    price : 169.99,
    stock : 13
})

console.log(gestorDeProductos.read())