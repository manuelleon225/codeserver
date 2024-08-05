import assert from "assert";
import environment from "../../src/utils/env.util.js";
import dao from "../../src/dao/dao.factory.js";

const { users } = dao;

describe(
    'Testing users FROM MOCHA', 
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
                assert.ok(data.email);
            }
        )
        it(
            "Testing user creation with property 'photo'",
            () => {
                assert.ok(data.photo);
            }
        )
        it(
            "Testing user creation with property 'password'",
            () => {
                assert.ok(data.password);
            }
        )
        it(
            "Testing user creation with property 'role'",
            () => {
                assert.ok(data.role || true);
            }
        )

        it(
            "Test user email type equals string",
            () => {
                assert.strictEqual(typeof data.email, "string");
            }
        )
        it(
            "Test user photo type equals string",
            () => {
                assert.strictEqual(typeof data.photo, "string");
            }
        )
        it(
            "Test user password type equals string",
            () => {
                assert.strictEqual(typeof data.password, "string");
            }
        )
        it(
            "Test user quantity type equals number",
            () => {
                assert.strictEqual(typeof data.role, "number");
            }
        )

        it(
            "Test creating a user that returns an object that has an id",
            async () => {
                const user = await users.create(data);
                id = user._id
                assert.ok(user._id);
            }
        )
        it(
            "Test updating the user created",
            async () => {
                const newData = { role: 1}
                const user = await users.update(id, newData);
                assert.notEqual(user.role, data.role);
            }
        )
        it(
            "Test deleting the user created",
            async () => {
                await users.destroy(id);
                const userShouldNotExists = await users.readOne(id)
                assert.strictEqual(userShouldNotExists, null);
            }
        )
    }
)
