import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";
import dotenv from "dotenv";

dotenv.config();
const API_URL = process.env.API_URL

const requester = supertest(
  `${API_URL}/api`
); /* hacer dinamico el puerto */

describe("Testeando SERVER", () => {
  let id;
  let token = "";
  const superProduct = {
    title: "SUPERTEST",
    photo:
      "https://musycorp.com/wp-content/uploads/2022/10/audifonos-gamer-audio-technica-ath-pg1-Musycorp-tienda-musical-francisco-el-hombre-1.png",
    category: "Electronics",
    price: 300,
    stock: 250,
  };
  const user = {
    email: "manuelleon@gmail.com",
    password: "123456",
  };
  it("Inicio de sesion de un usuario", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { _body, headers } = response;

    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });
  it("Creando product con el user logueado", async () => {
    const response = await requester
      .post("/products")
      .send(superProduct)
      .set("Cookie", token);
    const { _body } = response;

    expect(_body.statusCode).to.be.equals(201);
  });
  it("Modificando un product con el user logueado", async () => {
    let searchProduct = await requester.get("/products");
    let { _body } = searchProduct;
    searchProduct = _body.response[_body.response.length - 1]._id;
    const update = await productsRepository.updateRepository(searchProduct, {
      title: "New Title",
    });
    expect(searchProduct).to.not.equal(update);
  });

  it("Eliminando product con el user logueado", async () => {
    let searchProduct = await requester.get("/products");
    let { _body } = searchProduct;
    searchProduct = _body.response[_body.response.length - 1]._id;
    const response = await requester
      .delete(`/products/${searchProduct}`)
      .set("Cookie", token);
    _body = response._body;

    expect(_body.statusCode).to.be.equals(200);
  });
});