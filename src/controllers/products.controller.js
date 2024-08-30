import productManager from "../dao/mongo/managers/Products.manager.js";

import {
  paginateService,
  createService,
  readService,
  readOneService,
  destroyService,
  updateService,
} from "../services/products.service.js";
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

    const all = await paginateService({ filter, opts });
    const info = {
      totalDocs: all.totalDocs,
      page: all.page,
      totalPages: all.totalPages,
      limit: all.limit,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
    };

    return res.paginate(all.docs, info);
  } catch (error) {
    next(error);
  }
}
async function create(req, res, next) {
  try {
    const data = req.body;
    const create = await createService(data);
    return res.response201("created succesfully");
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
    const destroy = await destroyService(pid);
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