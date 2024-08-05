import { expect } from "chai";
import dao from "../../src/dao/dao.factory.js";

const { products } = dao;

describe(
    'Testing products FROM CHAI', 
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
                expect(data).to.have.property("title");
            }
        )
        it(
            "Testing product creation with property 'photo'",
            () => {
                expect(data).to.have.property("photo");
            }
        )
        it(
            "Testing product creation with property 'category'",
            () => {
                expect(data).to.have.property("category");
            }
        )
        it(
            "Testing product creation with property 'price'",
            () => {
                expect(data).to.have.property("price");
            }
        )
        it(
            "Testing product creation with property 'stock'",
            () => {
                expect(data).to.have.property("stock");
            }
        )

        it(
            "Test product title type equals string",
            () => {
                expect(data.title).to.be.a("string")
            }
        )
        it(
            "Test product photo type equals string",
            () => {
                expect(data.photo).to.be.a("string")
            }
        )
        it(
            "Test product category type equals string",
            () => {
                expect(data.category).to.be.a("string")
            }
        )
        it(
            "Test product price type equals number",
            () => {
                expect(data.price).to.be.a("number")
            }
        )
        it(
            "Test product stock type equals number",
            () => {
                expect(data.stock).to.be.a("number")
            }
        )

        it(
            "Test creating a product that returns an object that has an id",
            async () => {
                const product = await products.create(data);
                id = product._id
                expect(product).to.have.property("_id");
            }
        )
        it(
            "Test updating the product created",
            async () => {
                const newData = { title: "Tenis Off White Running"}
                const product = await products.update(id, newData);
                expect(product.title).is.not.equal(data.title);
            }
        )
        it(
            "Test deleting the product created",
            async () => {
                await products.destroy(id);
                const productShouldNotExists = await products.readOne(id)
                expect(productShouldNotExists).not.exist
            }
        )
    }
)
