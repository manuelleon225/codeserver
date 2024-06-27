import User from "../models/user.model.js";
import MongoManager from "../Manager.mongo.js";

const userManager = new MongoManager(User)
export default userManager