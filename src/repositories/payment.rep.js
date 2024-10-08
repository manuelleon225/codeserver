import Stripe from "stripe";
import environment from "../utils/env.util.js";
import cartManager from "../dao/mongo/managers/Cart.manager.js";
import PaymentProduct from "../dto/payment.dto.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(environment.SECRET_STRIPE_KEY)
const API_URL = process.env.API_URL

const createPaymentRepository = async (user_id) => {
  try {
    let productsOnCart = await cartManager.read({ user_id });
    const line_items = productsOnCart.map((prod) => new PaymentProduct(prod));
    console.log(line_items);
    const mode = "payment";
    const success_url = `${API_URL}/cart/successful_purchase`;
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url
    });
    return intent;
  } catch (error) {
    throw error
  }
}

export { createPaymentRepository }