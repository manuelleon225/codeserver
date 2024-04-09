import express from "express";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import indexRouter from "./src/routers/index.router.js";

const server = express()
const port = 8080
const ready = () => (console.log("server ready on port " + port))

server.listen(port, ready)

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use("/", indexRouter)
server.use(errorHandler)
server.use(pathHandler)