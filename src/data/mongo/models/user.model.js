import { Schema, model } from "mongoose";

const collection = "users"
const schema = new Schema({
    email: {type: String, required: true},
    photo: {type: String},
    password: {type: String, required: true},
    role: {type: Number}
},{
    timestamps: true
})

const User = model(collection, schema)
export default User