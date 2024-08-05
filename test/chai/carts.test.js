import { expect } from "chai";
import environment from "../../src/utils/env.util.js";
import dao from "../../src/dao/dao.factory.js";

const { carts } = dao;

describe(
    'Testing carts FROM CHAI', 
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
                expect(data).to.have.property("user_id");
            }
        )
        it(
            "Testing cart creation with property 'product_id'",
            () => {
                expect(data).to.have.property("product_id");
            }
        )
        it(
            "Testing cart creation with property 'quantity'",
            () => {
                expect(data).to.have.property("quantity");
            }
        )
        it(
            "Testing cart creation with property 'state'",
            () => {
                expect(data).to.have.property("state");
            }
        )

        it(
            "Test cart user_id type equals string",
            () => {
                expect(data.user_id).to.be.a("string")
            }
        )
        it(
            "Test cart product_id type equals string",
            () => {
                expect(data.product_id).to.be.a("string")
            }
        )
        it(
            "Test cart quantity type equals number",
            () => {
                expect(data.quantity).to.be.a("number")
            }
        )
        it(
            "Test cart state type equals string",
            () => {
                expect(data.state).to.be.a("string")
            }
        )

        it(
            "Test creating a cart that returns an object that has an id",
            async () => {
                const cart = await carts.create(data);
                id = cart._id
                expect(cart).to.have.property("_id");
            }
        )
        it(
            "Test updating the cart created",
            async () => {
                const newData = { quantity: 19}
                const cart = await carts.update(id, newData);
                expect(cart.quantity).is.not.equal(data.quantity);
            }
        )
        it(
            "Test deleting the cart created",
            async () => {
                await carts.destroy(id);
                const cartshouldNotExists = await carts.readOne(id)
                expect(cartshouldNotExists).not.exist
            }
        )
    }
)
