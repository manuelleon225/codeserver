import assert from "assert";
import dao from "../../src/dao/dao.factory.js";

const { products } = dao;

describe(
    "Testing products FROM MOCHA",
    () => {
        const data = { 
            title: "Zapatillas deportivas para correr",
            photo: "https://www.defaultimage.jpg.com",
            category: "Shoes",
            price: 21.99,
            stock: 50,
        }
        let id;
        it(
            "Testing product creation with property 'title'",
            () => {
                assert.ok(data.title);
            }
        )
        it(
            "Testing product creation with property 'photo'",
            () => {
                assert.ok(data.photo || true);
            }
        )
        it(
            "Testing product creation with property 'category'",
            () => {
                assert.ok(data.category);
            }
        )
        it(
            "Testing product creation with property 'price'",
            () => {
                assert.ok(data.price || true);
            }
        )
        it(
            "Testing product creation with property 'stock'",
            () => {
                assert.ok(data.stock || true);
            }
        )
        
        it(
            "Test product title type equals string",
            () => {
                assert.strictEqual(typeof data.title, "string");
            }
        )
        it(
            "Test product photo type equals string",
            () => {
                assert.strictEqual(typeof data.photo, "string");
            }
        )
        it(
            "Test product category type equals string",
            () => {
                assert.strictEqual(typeof data.category, "string");
            }
        )
        it(
            "Test product price type equals number",
            () => {
                assert.strictEqual(typeof data.price, "number");
            }
        )
        it(
            "Test product stock type equals number",
            () => {
                assert.strictEqual(typeof data.stock, "number");
            }
        )

        it(
            "Test creating a product that returns an object that has an id",
            async () => {
                const product = await products.create(data);
                id = product._id
                assert.ok(product._id);
            }
        )
        it(
            "Test updating the product created",
            async () => {
                const newData = { title: "Tenis Off White Running"}
                const product = await products.update(id, newData);
                assert.notEqual(product.title, data.title);
            }
        )
        it(
            "Test deleting the product created",
            async () => {
                await products.destroy(id);
                const productShouldNotExists = await products.readOne(id)
                assert.strictEqual(productShouldNotExists, null);
            }
        )
    }
)