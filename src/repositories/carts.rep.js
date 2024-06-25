import Repository from "./repository.js";
import cartManager from "../dao/mongo/managers/Cart.manager.js";

const cartsRepository = new Repository(cartManager)
export default cartsRepository