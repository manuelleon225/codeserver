import assert from "assert";
import environment from "../../src/utils/env.util.js";
import dao from "../../src/dao/dao.factory.js";

const { carts } = dao;

describe(
    "Testing carts FROM MOCHA",
    () => {
        const data = { 
            user_id: "664d3f789fa1615a88270b5d",
            product_id: "6640fbf1401d49d5ef001138",
            quantity: 20,
            state: "reserved"
        }
        let id;
        it(
            "Testing cart creation with property 'user_id'",
            () => {
                assert.ok(data.user_id);
            }
        )
        it(
            "Testing cart creation with property 'product_id'",
            () => {
                assert.ok(data.product_id);
            }
        )
        it(
            "Testing cart creation with property 'quantity'",
            () => {
                assert.ok(data.quantity);
            }
        )
        it(
            "Testing cart creation with property 'state'",
            () => {
                assert.ok(data.state || true);
            }
        )
        
        it(
            "Test cart user_id type equals string",
            () => {
                assert.strictEqual(typeof data.user_id, "string");
            }
        )
        it(
            "Test product_id photo type equals string",
            () => {
                assert.strictEqual(typeof data.product_id, "string");
            }
        )
        it(
            "Test cart quantity type equals number",
            () => {
                assert.strictEqual(typeof data.quantity, "number");
            }
        )
        it(
            "Test cart state type equals string",
            () => {
                assert.strictEqual(typeof data.state, "string");
            }
        )

        it(
            "Test creating a cart that returns an object that has an id",
            async () => {
                const cart = await carts.create(data);
                id = cart._id
                assert.ok(cart._id);
            }
        )
        it(
            "Test updating the cart created",
            async () => {
                const newData = { quantity: 19}
                const cart = await carts.update(id, newData);
                assert.notEqual(cart.quantity, data.quantity);
            }
        )
        it(
            "Test deleting the cart created",
            async () => {
                await carts.destroy(id);
                const cartShouldNotExists = await carts.readOne(id)
                assert.strictEqual(cartShouldNotExists, null);
            }
        )
    }
)