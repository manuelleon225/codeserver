import express from "express";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import indexRouter from "./src/routers/index.router.js";
import morgan from "morgan";
import { engine } from 'express-handlebars'
import __dirname from './utils.js'

const server = express()
const port = 8080
const ready = () => (console.log("server ready on port " + port))

server.listen(port, ready)

server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use (morgan("dev"))

server.use("/", indexRouter)
server.use(errorHandler)
server.use(pathHandler)