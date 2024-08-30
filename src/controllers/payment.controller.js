import { createPaymentService } from "../services/payment.service.js"
import { verifyToken } from "../utils/token.util.js";

const createPayment = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        const user_id = token ? verifyToken(token)._id : undefined;
        const response = await createPaymentService(user_id);
        return res.response201(response);
    } catch (error) {
        console.log(error);
        return next(error)
    }
}

export { createPayment }