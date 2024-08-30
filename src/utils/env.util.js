import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil
const path = env === "prod" ? "./.env.prod" : "./.env.dev"
config({ path })

const environment = {
    MONGO_DATABASE_URI : process.env.MONGO_DATABASE_URI, 
    PORT : process.env.PORT, 
    SECRET : process.env.SECRET, 
    SECRET_JWT : process.env.SECRET_JWT, 
    SECRET_COOKIE : process.env.SECRET_COOKIE,
    PUBLIC_STRIPE_KEY : process.env.PUBLIC_STRIPE_KEY,
    SECRET_STRIPE_KEY : process.env.SECRET_STRIPE_KEY
}

export default environment;