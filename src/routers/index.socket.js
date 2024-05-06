import userManager from "../data/fs/UsersManager.js";
import productManager from "../data/fs/ProductManager.js";
import cartManager from "../data/fs/CartManager.js";

export default async (socketData) => {
    console.log(`ID connected: ${socketData.id}`);
    socketData.emit("users", await userManager.read());
    socketData.emit("products", await productManager.read())
    socketData.emit("carts", await cartManager.read());
    socketData.on("productDetail", async ( pid ) => {
        console.log("SOCKET PID " + pid);
        const prod = await productManager.readOne(pid)
        console.log("leido el prod by id ");
        console.log(prod);
        socketData.emit("productDetail", prod)
        console.log("Emitted productDetail event with product data") // no funciona, ver mas tarde
    })
    socketData.on("register-product", async (data) => {
        await productManager.create(data)
        socketData.emit("products", await productManager.read())
    })
}