import Product from "../models/products.model.js";
import MongoManager from "../Manager.mongo.js";

const productManager = new MongoManager(Product)
export default productManager