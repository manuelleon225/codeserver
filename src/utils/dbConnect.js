import { connect } from "mongoose";

export async function dbConnect() {
    try {
        await connect(process.env.MONGO_DATABASE_URI)
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;