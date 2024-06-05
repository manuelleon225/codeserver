// import productManager from "../../data/fs/ProductManager.js";
import productManager from "../../data/mongo/managers/Products.manager.js";
import CustomRouter from "../CustomRouter.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid",["PUBLIC"], readOne);
    this.create("/real",["ADMIN"], create);
    this.update("/:pid",["ADMIN"], update);
    this.delete("/:pid",["ADMIN"], deleteProduct);
  }
}

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const allProducts = await productManager.read(category);
    if (allProducts.length !== 0) {
      return res.response200(allProducts);
    } else {
      const error = new Error("NOT FOUND PRODUCTS");
      error.statusCode = 404;
      throw error;
    }
  } catch (err) {
    return next(err);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const productById = await productManager.readOne(pid);
    if (productById) {
      return res.response200(productById);
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
  } catch (err) {
    return next(err);
  }
}

async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};
    if (req.query.limit) {
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const allProducts = await productManager.paginate({ filter, opts });
    const info = {
      totalDocs: allProducts.totalDocs,
      page: allProducts.page,
      totalPages: allProducts.totalPages,
      limit: allProducts.limit,
      prevPage: allProducts.hasPrevPage
        ? allProducts.prevPage
        : allProducts.offset,
      nextPage: allProducts.hasNextPage
        ? allProducts.nextPage
        : allProducts.offset,
    };
    return res.paginate(allProducts.docs, info);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const newProduct = await productManager.create(data);
    return res.response201(`ID Product created: ${newProduct.id} || Title: ${newProduct.title} || Photo: ${newProduct.photo} || Category: ${newProduct.category} || Price: ${newProduct.price} || Stock: ${newProduct.stock}`);
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const product = await productManager.update(pid, data);
    return product ? res.response200(`Product with ID: ${product.id} updated`) : res.response404()
  } catch (error) {
    return next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const productToDelete = await productManager.destroy(pid);
    return productToDelete ? res.response200(`Product with ID: ${productToDelete.id} deleted`) : res.response404()
  } catch (error) {
    return next(error);
  }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();
