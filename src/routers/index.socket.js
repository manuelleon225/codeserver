import userManager from "../data/fs/UsersManager.js";
import productManager from "../data/fs/ProductManager.js";

export default async (socketData) => {
    console.log(`ID connected: ${socketData.id}`);
    socket.emit("users", await userManager.read());
    socketData.emit("products", await productManager.read())
    socketData.on("register-product", async (data) => {
        await productManager.create(data)
        socketData.emit("products", await productManager.read())
    })
}