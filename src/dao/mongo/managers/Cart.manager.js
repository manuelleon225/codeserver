import Cart from "../models/cart.model.js";
import MongoManager from "../Manager.mongo.js";

const cartManager = new MongoManager(Cart)

export default cartManager