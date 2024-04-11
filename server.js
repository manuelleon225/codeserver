import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";

import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./utils.js";
import { Socket } from "dgram";

//http server
const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
const nodeServer = createServer(server)
const socketServer = new Server(nodeServer)
socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));

const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);