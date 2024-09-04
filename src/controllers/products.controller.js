import productManager from "../dao/mongo/managers/Products.manager.js";

import {
  paginateService,
  createService,
  readService,
  readOneService,
  destroyService,
  updateService,
} from "../services/products.service.js";
import { verifyToken } from "../utils/token.util.js";
//services/products.services.js

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
    if (req.query._id) {
      filter._id = req.query._id;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    let all = await paginateService({ filter, opts });
    let filteredDocs = all.docs;
    // let token = req.cookies["token"];
    // if(token){
    //   let data = verifyToken(token);
    //   const { _id, role } = data;
    //   if (role === 2 || role === "PREM") {
    //     filteredDocs = all.docs.filter((prod) => prod.supplier_id !== _id)
    //   }
    //   while (filteredDocs.length === 0 && all.hasNextPage) {
    //     opts.page++;
    //     all = await paginateService({ filter, opts });
    //     filteredDocs = all.docs.filter((prod) => prod.supplier_id !== _id);
    //   }
    // }
    const info = {
      totalDocs: all.totalDocs,
      page: all.page,
      totalPages: all.totalPages,
      limit: all.limit,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
    };

    return res.paginate(filteredDocs, info);
  } catch (error) {
    next(error);
  }
}
async function create(req, res, next) {
  try {
    const data = req.body;
    const create = await createService(data);
    return res.response201(create);
  } catch (error) {
    return next(error);
  }
}
async function read(req, res, next) {
  try {
    const read = await readService();
    if (read.length > 0) {
      return res.response200(read);
    } else {
      return res.error404("PRODUCT NOT FOUND");
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const readOne = await readOneService(pid);
    if (readOne) {
      return res.response200(readOne);
    } else {
      return res.error404("PRODUCT NOT FOUND");
    }
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    let prod = await readOne(pid)
    let token = req.cookies["token"];
    let destroy;
    if(token){
      let data = verifyToken(token);
      const { _id, role } = data;
      if(role === 0 || role === "ADMIN"){
        destroy = await destroyService(pid);
      } else if (role === 2 || role === "PREM" && prod.supplier_id === _id ) {
        destroy = await destroyService(pid);
      } else {
        return error.response403
      }
    } else {
      return res.response403
    }
    if (destroy) {
      return res.response200(destroy);
    } else {
      return res.error404("PRODUCT NOT FOUND");
    }
  } catch (error) {
    return next(error);
  }
}
async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const update = await updateService(pid, data);
    if (update) {
      return res.response200(update);
    } else {
      return res.error404("PRODUCT NOT FOUND");
    }
  } catch (error) {
    return next(error);
  }
}

export { paginate, create, read, readOne, destroy, update };