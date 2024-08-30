import Service from "./service.js";
import ProductsManagerMongo from "../dao/mongo/managers/Products.manager.js";
import productsRepository from "../repositories/products.rep.js";

//ProductsManager.js

// const productService = new Service(ProductsManagerMongo);
const productService = new Service(productsRepository);

export const {
  paginateService,
  createService,
  readService,
  readOneService,
  destroyService,
  updateService,
} = productService;