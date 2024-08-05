import { expect } from "chai";
import environment from "../../src/utils/env.util.js";
import dao from "../../src/dao/dao.factory.js";

const { users } = dao;

describe(
    'Testing users FROM CHAI', 
    () => {
        const data = { 
            email: "testaccount@gmail.com",
            photo: "www.photo.com",
            password: "asdasd123",
            role: 0
        }
        let id;
        it(
            "Testing user creation with property 'email'",
            () => {
                expect(data).to.have.property("email");
            }
        )
        it(
            "Testing user creation with property 'photo'",
            () => {
                expect(data).to.have.property("photo");
            }
        )
        it(
            "Testing user creation with property 'password'",
            () => {
                expect(data).to.have.property("password");
            }
        )
        it(
            "Testing user creation with property 'role'",
            () => {
                expect(data).to.have.property("role");
            }
        )

        it(
            "Test user email type equals string",
            () => {
                expect(data.email).to.be.a("string")
            }
        )
        it(
            "Test user photo type equals string",
            () => {
                expect(data.photo).to.be.a("string")
            }
        )
        it(
            "Test user password type equals string",
            () => {
                expect(data.password).to.be.a("string")
            }
        )
        it(
            "Test user quantity type equals number",
            () => {
                expect(data.role).to.be.a("number")
            }
        )

        it(
            "Test creating a user that returns an object that has an id",
            async () => {
                const user = await users.create(data);
                id = user._id
                expect(user).to.have.property("_id");
            }
        )
        it(
            "Test updating the user created",
            async () => {
                const newData = { role: 1}
                const user = await users.update(id, newData);
                expect(user.role).is.not.equal(data.role);
            }
        )
        it(
            "Test deleting the user created",
            async () => {
                await users.destroy(id);
                const userShouldNotExists = await users.readOne(id)
                expect(userShouldNotExists).not.exist
            }
        )
    }
)
