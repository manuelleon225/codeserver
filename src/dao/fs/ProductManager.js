import fs from "fs"
import crypto from "crypto"
const path = "./src/data/files/products.json"

class ProductManager {
    constructor(path) {
        this.path = path,
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log("File created");
        }
        return fs.promises.readFile(this.path, "utf-8")
    }
    async create(data) {
        try {
            if (!data.title) {
                const error = new Error("ERROR: Faltan datos")
                throw error
            } else {
                const newProduct = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: data.title,
                    photo: data.photo || "https://back.tiendainval.com/backend/admin/backend/web/archivosDelCliente/items/images/20210108100138no_image_product.png",
                    category: data.category || "undefined",
                    price: data.price || 1,
                    stock: data.stock || 1
                }
                let fileProducts = await fs.promises.readFile(this.path, "utf-8")
                fileProducts = JSON.parse(fileProducts)
                fileProducts.push(newProduct)
                fileProducts = JSON.stringify(fileProducts, null, 2)
                await fs.promises.writeFile(this.path, fileProducts)
                console.log("Product created (File System)");
                return newProduct
            }
        } catch (error) {
            throw error
        }
    }
    async read(query) {
        try {
            let fileProducts = await fs.promises.readFile(this.path, "utf-8")
            // fileProducts = JSON.parse(fileProducts)
            fileProducts ? fileProducts = JSON.parse(fileProducts) : fileProducts; // pregunto si tiene algun dato el fileProducts para que no tire error el parse, ya que si no tiene datos no puede parsear nada y se rompe la app
            query ? fileProducts = fileProducts.filter((prod) => prod.category == query) : fileProducts
            return fileProducts
        } catch (error) {
            throw error
        }
    }
    async readOne(id) {
        try {
            let fileProducts = await fs.promises.readFile(this.path, "utf-8")
            fileProducts = await JSON.parse(fileProducts)
            const prodFound = await fileProducts.find((prod) => prod.id == id)
            if (!prodFound) {
                const error = new Error("No hay ningun producto registrado con ese id")
                throw error
            } else {
                return prodFound
            }
        } catch (error) {
            throw error
        }
    }
    async destroy(id){
        try{
            let fileProducts = await fs.promises.readFile(this.path, "utf-8")
            fileProducts = JSON.parse(fileProducts)
            const prodFound = fileProducts.find((prod) => prod.id == id)
            if(!prodFound){
                const error = new Error("PRODUCT WITH THIS ID NOT FOUND")
                throw error
            } else {
                fileProducts = fileProducts.filter((prod) => prod.id != id)
                fileProducts = JSON.stringify(fileProducts, null, 2)
                await fs.promises.writeFile(this.path, fileProducts)
                console.log(`Product deleted: \n ID: ${id}\n NAME: ${prodFound.title}`);
                return fileProducts
            }
        } catch(error){
            throw error
        }
    }
    async update(pid, data){
        try {
            let allProducts = await this.read()
            const productToUpdate = allProducts.find(prod => prod.id == pid) // El find tiene una mutabilidad que permite modificar el objeto y que el cambio se aplique al array de donde se ENCONTRO este objeto
            Object.assign(productToUpdate, data) // Actualiza los campos del producto con los nuevos valores traidos por el body
            console.log(productToUpdate);
            allProducts = JSON.stringify(allProducts, null, 2)
            await fs.promises.writeFile(this.path, allProducts)
            return productToUpdate
        } catch (error) {
            throw error
        } 
    }
    async paginate({ filter, opts }) {
        try {
          let fileProducts = await fs.promises.readFile(this.path, "utf-8");
          fileProducts = fileProducts ? JSON.parse(fileProducts) : []; 
    
          if (filter) {
            fileProducts = fileProducts.filter((prod) => {
              return Object.keys(filter).every((key) => prod[key] === filter[key]);
            });
          }
    
          const total = fileProducts.length;
          const page = opts.page || 1;
          const limit = opts.limit || 10;
          const offset = (page - 1) * limit;
    
          const paginatedProducts = fileProducts.slice(offset, offset + limit);
    
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
            nextPage: page < Math.ceil(total / limit) ? page + 1 : null
          };
        } catch (error) {
          throw error;
        }
      }    
      async readByEmail(email) {
        try {
          let fileProducts = await fs.promises.readFile(this.path, "utf-8");
          fileProducts = fileProducts ? JSON.parse(fileProducts) : [];
    
          const product = fileProducts.find((prod) => prod.email === email);

          if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
          }
    
          return product;
        } catch (error) {
          throw error;
        }
      }
    
}

const productManager = new ProductManager(path)
export default productManager
