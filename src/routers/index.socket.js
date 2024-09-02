import productManager from "../dao/mongo/managers/Products.manager.js";

export default async (socketData) => {
    // console.log(`ID connected: ${socketData.id}`);

    // socketData.on("register-product", async (data) => {
    //     await productManager.create(data)
    //     socketData.emit("products", await productManager.read())
    // })
}

