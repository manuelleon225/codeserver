import Service from "./Service.js";
import UsersManager from "../data/mongo/managers/Users.manager.js";

const userService = new Service(UsersManager);
export const {
  createService,
  readOneService,
  readByEmailService,
  updateService,
  destroyService,
} = userService;