import args from "../utils/args.util.js"; 
import dbConnect from "../utils/dbConnect.js";

const persistence = args.persistence;
let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    const { default: productsManagerMem } = await import(
      "./memory/ProductManager.memory.js"
    );
    const { default: usersManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );
    const { default: cartsManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );

    dao = {
      products: productsManagerMem,
      carts: cartsManagerMem,
      users: usersManagerMem,
    };
    break;
  case "fs":
    console.log("connected to Fs");
    const { default: productsManagerFs } = await import(
      "./fs/ProductManager.js"
    );
    const { default: usersManagerFs } = await import("./fs/UserManager.js");
    const { default: cartsManagerFs } = await import("./fs/CartsManager.js");
    dao = {
      products: productsManagerFs,
      carts: cartsManagerFs,
      users: usersManagerFs,
    };
    break;
  default:
    console.log("connected to mongo w/dao");
    dbConnect();
    const { default: productsManagerMongo } = await import(
      "./mongo/managers/Products.manager.js"
    );
    const { default: cartsManagerMongo } = await import(
      "./mongo/managers/Cart.manager.js"
    );
    const { default: usersManagerMongo } = await import(
      "./mongo/managers/Users.manager.js"
    );
    dao = {
      products: productsManagerMongo,
      carts: cartsManagerMongo,
      users: usersManagerMongo,
    };
    break;
}

export default dao;