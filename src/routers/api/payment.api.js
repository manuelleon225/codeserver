import { createPayment } from "../../controllers/payment.controller.js";
import CustomRouter from "../CustomRouter.js";

class PaymentRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM", "ADMIN"], createPayment);
  }
}

const paymentRouter = new PaymentRouter();

export default paymentRouter.getRouter();
