import { Schema, model } from "mongoose";

const collection = "products"
const schema = new Schema({
    title: {type: String, required: true},
    photo: {type: String},
    category: {type: String},
    price: {type: Number},
    stock: {type: Number},
},{
    timestamps: true
})

const Product = model(collection, schema)
export default Product