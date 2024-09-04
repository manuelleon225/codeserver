import crypto from "crypto";
import CustomError from "../../utils/errors/CustomError";
import errors from "../../utils/errors/Errors";

class ProductManager {
  static #products = [];
  create(data) {
    try {
      if (!data.title) {
        return CustomError.new(errors.missingData);
      } else {
        const newProduct = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo || "pic_default.jpg",
          category: data.category || "undefined",
          price: data.price || 1,
          stock: data.stock || 1,
          supplier_id: data.supplier_id,
        };
        ProductManager.#products.push(newProduct);
        console.log("Product created (memory)");
      }
    } catch (error) {
      throw error;
    }
  }
  read(query) {
    try {
      if (ProductManager.#products.length == 0) {
        return CustomError.new(errors.notFound);
      } else {
        const products = ProductManager.#products.filter(
          (prod) => prod.category == query
        );
        return ProductManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }
  readOne(id) {
    try {
      const prodFound = ProductManager.#products.find((prod) => prod.id == id);
      if (!prodFound) {
        return CustomError.new(errors.notFound);
      } else {
        return prodFound;
      }
    } catch (error) {
      throw error;
    }
  }
  destroy(id) {
    try {
      const prodFound = ProductManager.#products.find((prod) => prod.id == id);
      if (!prodFound) {
        return CustomError.new(errors.notFound);
      } else {
        ProductManager.#products = ProductManager.#products.filter(
          (prod) => prod.id != id
        );
        return ProductManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }
  update(pid, data) {
    try {
      const productToUpdate = ProductManager.#products.find(
        (prod) => prod.id == pid
      );
      if (productToUpdate) {
        Object.assign(productToUpdate, data);
        return productToUpdate;
      }
    } catch (error) {
      throw error;
    }
  }
  paginate({ filter, opts }) {
    try {
      let filteredProducts = MemoryManager.#products;

      if (filter) {
        filteredProducts = filteredProducts.filter((prod) => {
          return Object.keys(filter).every((key) => prod[key] === filter[key]);
        });
      }

      const total = filteredProducts.length;
      const page = opts.page || 1;
      const limit = opts.limit || 10;
      const offset = (page - 1) * limit;

      const paginatedProducts = filteredProducts.slice(offset, offset + limit);

      return {
        docs: paginatedProducts,
        totalDocs: total,
        limit: limit,
        page: page,
        totalPages: Math.ceil(total / limit),
        pagingCounter: offset + 1,
        hasPrevPage: page > 1,
        hasNextPage: page < Math.ceil(total / limit),
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
      };
    } catch (error) {
      throw error;
    }
  }
  readByEmail(email) {
    try {
      const product = MemoryManager.#products.find(
        (prod) => prod.email === email
      );

      if (!product) {
        return CustomError.new(errors.notFound);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }
}

// const gestorDeProductos = new ProductManager()
// gestorDeProductos.create({
//     title : "Camisa",
//     photo : "camisa.jpg",
//     category : "ropa",
//     price : 9.99,
//     stock : 10
// })
// gestorDeProductos.create({
//     title : "Pantalon",
//     photo : "pantalon.jpg",
//     category : "ropa",
//     price : 12.99,
//     stock : 10
// })
// gestorDeProductos.create({
//     title : "Horno",
//     photo : "horno.jpg",
//     category : "cocina",
//     price : 59.99,
//     stock : 5
// })
// gestorDeProductos.create({
//     title : "Heladera",
//     photo : "heladera.jpg",
//     category : "cocina",
//     price : 1199.00,
//     stock : 7
// })
// gestorDeProductos.create({
//     title : "Monitor ViewSonic",
//     photo : "monitor.jpg",
//     category : "tecnologia",
//     price : 169.99,
//     stock : 13
// })

// console.log(gestorDeProductos.read())
// // console.log(gestorDeProductos.readOne(1)) // Va a dar error por el random id, siempre cambia
// console.log(gestorDeProductos.destroy(2))
// console.log(gestorDeProductos.read()) // Fijarse q se haya eliminado el producto con id 2
