import { faker } from "@faker-js/faker";
import cartsRepository from "../repositories/carts.rep.js";
import dbConnect from "../utils/dbConnect.js";
import dotenv from "dotenv";
import usersRepository from "../repositories/users.rep.js";
import productsRepository from "../repositories/products.rep.js";

// Si no lo cargo, no me anda el dbConnect()
dotenv.config();

async function createData() {
  try {
    await dbConnect();
    const users = await usersRepository.readRepository();
    const products = await productsRepository.readRepository();
    for (let i = 0; i < 4; i++) {
      const user = users[faker.number.int({ min: 0, max: users.length - 1 })];
      const product = products[faker.number.int({ min: 0, max: products.length - 1 })];
      const cart = {
        user_id: user._id,
        product_id: product._id,
        quantity: faker.number.int({ min: 1, max: 10 }),
        state: faker.helpers.arrayElement(["reserved", "paid", "delivered"]),
      };
      await cartsRepository.createRepository(cart);
    }
    console.log("Carts created");
  } catch (error) {
    console.log(error);
  }
}

createData();
