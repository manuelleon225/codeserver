import Repository from "./repository.js";
import userManager from "../dao/mongo/managers/Users.manager.js";

const usersRepository = new Repository(userManager)
export default usersRepository