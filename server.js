import express, { query } from "express";
import productManager from "./data/fs/ProductManager.js";

const server = express()
const port = 8080
const ready = () => (console.log("server ready on port " + port))

server.listen(port, ready)
server.use(express.urlencoded({ extended: true }))

server.get("/api/products", async (req, res) => {
    try{
        const { category } = req.query
        const allProducts = await productManager.read(category)
        if(allProducts.length !== 0){
            return res.status(200).json({
                response: allProducts
            })
        } else {
            const error = new Error("NOT FOUND PRODUCTS")
            error.statusCode = 404
            throw error
        }
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({
            response: null,
            message: err.message
        })
    }
})

server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const productById = await productManager.readOne(pid)
        if(productById) {
            return res.status(200).json({
                response: productById
            })
        } else {
            const error = new Error("NOT FOUND PRODUCT")
            error.statusCode = 404
            throw error
        }
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode).json({
            response: null,
            message: err.message
        })
    }
})