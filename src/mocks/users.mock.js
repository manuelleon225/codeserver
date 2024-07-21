import { faker } from '@faker-js/faker'
import usersRepository from '../repositories/users.rep.js';
import dbConnect from '../utils/dbConnect.js';
import dotenv from 'dotenv';

// Si no lo cargo, no me anda el dbConnect()
dotenv.config();

async function createData() {
    try {
        await dbConnect();
        for(let i = 0; i<4; i++){
            const user = {
                email: faker.internet.email(),
                photo: faker.image.avatar(), 
                password: "asd123", 
                role: faker.number.int({ min: 0, max: 1 })
            };
            await usersRepository.createRepository(user);
        }
        console.log("Users created");
    } catch (error) {
        console.log(error);
    }
}

createData();