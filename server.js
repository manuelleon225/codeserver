import "dotenv/config.js"
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import exphbs from "express-handlebars";
import { engine } from "express-handlebars";

import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import { dbConnect } from "./src/utils/dbConnect.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

//http server
const server = express();
const port = process.env.PORT || 9000;
const ready = async () => {
    await dbConnect()
    console.log("server ready on port " + port)
};
const nodeServer = createServer(server)
const socketServer = new Server(nodeServer)
socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);

//template engine
const hbs = exphbs.create({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
  });  
server.engine("handlebars", hbs.engine);
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + 'public'));
server.use(express.json());
server.use(cookieParser())
server.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: process.env.MONGO_DATABASE_URI, ttl: 60*60})
}))
server.use(morgan("dev"));


//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);