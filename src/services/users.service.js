import Service from "./Service.js";
import userManager from "../dao/mongo/managers/Users.manager.js";
import usersRepository from "../repositories/users.rep.js";

// const userService = new Service(userManager);
const userService = new Service(usersRepository);

export const {
  createService,
  readOneService,
  readByEmailService,
  updateService,
  destroyService,
} = userService;