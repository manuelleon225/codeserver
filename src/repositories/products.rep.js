import Repository from "./repository.js";
import productManager from "../dao/mongo/managers/Products.manager.js";

const productsRepository = new Repository(productManager)
export default productsRepository