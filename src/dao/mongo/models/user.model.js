import { Schema, model } from "mongoose";

const collection = "users"
const schema = new Schema({
    email: {type: String, required: true,unique:true, index: true},
    photo: {type: String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwb7VqZWWn6W92xv34aLhCXSrVGeArGHPhSKh4PysLQ&s"},
    password: {type: String, required: true},
    role: {type: Number,default: 0, index: true}
},{
    timestamps: true
})

const User = model(collection, schema)
export default User