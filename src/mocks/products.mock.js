import { faker } from '@faker-js/faker'
import productsRepository from '../repositories/products.rep.js'
import dbConnect from '../utils/dbConnect.js';
import dotenv from 'dotenv';

// Si no lo cargo, no me anda el dbConnect()
dotenv.config();

async function createData() {
    try {
        await dbConnect();
        for(let i = 0; i<1000; i++){
            const product = {
                title: faker.commerce.productName(),
                photo: faker.image.url(),
                category: faker.commerce.department(),
                price: faker.commerce.price(),
                stock: faker.number.int({ min: 1, max: 100 })
            };
            await productsRepository.createRepository(product);
        }
        console.log("Products created");
    } catch (error) {
        console.log(error);
    }
}

createData();