import { connect } from "mongoose";

export async function dbConnect() {
    try {
        console.log(process.env.MONGO_DATABASE_URI);
        await connect(process.env.MONGO_DATABASE_URI)
        console.log("mongo database connected successfully");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;