import express from "express";
import productManager from "./src/data/fs/ProductManager.js";
import usersManager from "./src/data/fs/UsersManager.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";

const server = express()
const port = 8080
const ready = () => (console.log("server ready on port " + port))

server.listen(port, ready)

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(errorHandler)
// server.use(pathHandler)

server.get("/api/products", read)

server.get("/api/products/:pid", readOne)

server.post("/api/products", create)

server.put("/api/products/:pid", update)

server.delete("/api/products/:pid", deleteProduct)

async function read (req, res, next){
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
        return next(err)
    }
}

async function readOne (req, res, next){
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
        return next(err)
    }
}

async function create(req, res, next){
    try {
        const data = req.body
        console.log(data);
        const newProduct = await productManager.create(data)
        return res.json({
            statusCode: 201,
            response: `PROD ID: ${newProduct.id}`,
            message: `Product created: Title: ${newProduct.title} || Photo: ${newProduct.photo} || Category: ${newProduct.category} || Price: ${newProduct.price} || Stock: ${newProduct.stock}`
        })
    } catch (error) {
        return next(error)
    }
}

async function update(req, res, next){
    try {
        const { pid } = req.params
        const data = req.body
        const product = await productManager.update(pid, data)
        return res.json({
            statusCode: 200,
            message: `Product with ID: ${product.id} updated`
        })
    } catch (error) {
        return next(error)
    }
}

async function deleteProduct(req, res, next){
    try {
        const { pid } = req.params
        let allProducts = await productManager.read()
        const productToDelete = allProducts.find((prod) => prod.id === pid)
        await productManager.destroy(pid)
        return res.json({
            statusCode: 200,
            response: productToDelete
        })
    } catch (error) {
        return next(error)
    }
}

//USERS//

server.get("/api/users", async (req, res, next) => {
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
        return next(err)
    }
})

server.get("/api/users/:uid", async (req, res, next) => {
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
        return next(err)
    }
})