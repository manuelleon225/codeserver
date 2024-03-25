import express, { query } from "express";
import productManager from "./data/fs/ProductManager.js";
import usersManager from "./data/fs/UsersManager.js";

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

//USERS//

server.get("/api/users", async (req, res) => {
    try{
        const { role } = req.query
        const allUsers = await usersManager.read(role)
        if(allUsers.length !== 0){
            return res.status(200).json({
                response: allUsers
            })
        } else {
            const error = new Error("NOT FOUND USERS")
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

server.get("/api/users/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const usersById = await usersManager.readOne(uid)
        if(usersById) {
            return res.status(200).json({
                response: usersById
            })
        } else {
            const error = new Error("NOT FOUND USER")
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