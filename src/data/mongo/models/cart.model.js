import { Schema,Types, model } from "mongoose";

const collection = "cart";
const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      index: true,
      required: true,
    },
    product_id: {
      type: Types.ObjectId,
      ref: "products",
      index: true,
      required: true,
    },
    quantity: { type: Number, required: true },
    state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"] },
  },
  {
    timestamps: true,
  }
);

const Cart = model(collection, schema);
export default Cart;
