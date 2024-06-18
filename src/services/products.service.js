import Service from "./Service.js";
import ProductsManagerMongo from "../data/mongo/managers/Products.manager.js";
//ProductsManager.js

const productService = new Service(ProductsManagerMongo);
export const {
  paginateService,
  createService,
  readService,
  readOneService,
  destroyService,
  updateService,
} = productService;