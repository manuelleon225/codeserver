import { Router } from "express";
import { verifyToken } from "../utils/token.util.js";
import userManager from "../dao/mongo/managers/Users.manager.js";
import logger from "../utils/winston.util.js";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }

  responses = (req, res, next) => {
    res.response200 = (message) => res.json({ statusCode: 200, message });
    res.paginate = (response, info) =>
      res.json({ statusCode: 200, response, info });
    res.response201 = (message) => res.json({ statusCode: 201, message });
    res.response400 = (message) => {
      logger.ERROR(`${req.method} ${req.url} _ 400 _ ${new Date().toLocaleTimeString()} - ${message}`)
      return res.json({ statusCode: 400, message: message })
    }
    res.response401 = () => {
      logger.ERROR(`${req.method} ${req.url} _ 401 _ ${new Date().toLocaleTimeString()} - Bad auth from policies!`)
      return res.json({ statusCode: 401, message: "Bad auth from policies!" });
    }
    res.response403 = () => {
      logger.ERROR(`${req.method} ${req.url} _ 403 _ ${new Date().toLocaleTimeString()} - FORBIDDEN 403!`)
      res.json({ statusCode: 403, message: "FORBIDDEN 403!" });
    }
    res.response404 = () => {
      logger.ERROR(`${req.method} ${req.url} _ 404 _ ${new Date().toLocaleTimeString()} - NOT FOUND!`)
      res.json({ statusCode: 404, message: "NOT FOUND" });
    }
    return next();
  };
  policies = (policie) => async (req, res, next) => {
    if (policie.includes("PUBLIC")) return next()
    else {
      let token = req.cookies["token"];
      if (!token) return res.response401()
      else {
        try {
          token = verifyToken(token);
          const { role, email } = token
          if (
            (policie.includes("ADMIN") && role === 0) ||
            (policie.includes("USER") && role === 1) || 
            (policie.includes("PREM") && role === 2)
          ) {
            const user = await userManager.readByEmail(email);
            req.user = user;
            return next();
          } else return res.response403();
        } catch (error) {
          return res.response400(error.message);
        }
      }
    }
  }; 

  create(path, arrayOfPolicies, ...callbacks) {
    this.router.post(path, this.responses, this.policies(arrayOfPolicies), this.applyCbs(callbacks));
  }
  read(path, arrayOfPolicies, ...callbacks) {
    this.router.get(path, this.responses, this.policies(arrayOfPolicies), this.applyCbs(callbacks));
  }
  update(path, arrayOfPolicies, ...callbacks) {
    this.router.put(path, this.responses, this.policies(arrayOfPolicies), this.applyCbs(callbacks));
  }
  destroy(path, arrayOfPolicies, ...callbacks) {
    this.router.delete(path, this.responses, this.policies(arrayOfPolicies), this.applyCbs(callbacks));
  }
  use(path, ...callbacks) {
    this.router.use(path, this.responses, this.applyCbs(callbacks));
  }
}

export default CustomRouter;
