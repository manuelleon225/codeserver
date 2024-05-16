import { Router } from "express";
// import productManager from "../../data/fs/ProductManager.js";
import productManager from "../../data/mongo/managers/Products.manager.js";

const productsRouter = Router()

productsRouter.get("/", read)
productsRouter.get("/paginate", paginate)
productsRouter.get("/:pid", readOne)
productsRouter.post("/real", create)
productsRouter.put("/:pid", update)
productsRouter.delete("/:pid", deleteProduct)

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

async function paginate(req, res, next) {
    try {
        const filter = {}
        const opts = {}
        if(req.query.limit){
            opts.limit = req.query.limit
        }
        if(req.query.page){
            opts.page = req.query.page
        }
        if(req.query.category){
            filter.category = req.query.category;
        }
        const allProducts = await productManager.paginate({filter, opts})
        return res.json({
            statusCode: 200,
            response: allProducts.docs,
            info: {
                totalDocs: allProducts.totalDocs,
                page: allProducts.page,
                totalPages: allProducts.totalPages, 
                limit: allProducts.limit,
                prevPage: allProducts.hasPrevPage ? allProducts.prevPage : allProducts.offset,
                nextPage: allProducts.hasNextPage ? allProducts.nextPage : allProducts.totalPages
            }
        })
    } catch (error) {
        return next(error)
    }
}

async function create(req, res, next){
    try {
        const data = req.body
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

export default productsRouter