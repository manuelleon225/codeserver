import cartsManager from "../../dao/mongo/managers/Cart.manager.js";
import { Types } from "mongoose";
import CustomRouter from "../CustomRouter.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/:uid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const ticket = await cartsManager.aggregate([
          {
            $match: {
              user_id: new Types.ObjectId(uid),
            },
          },
          {
            $lookup: {
              foreignField: "_id",
              from: "products",
              localField: "product_id",
              as: "product_id",
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
              },
            },
          },
          { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
          { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
          { $project: { _id: 0, user_id: "$_id", total: "$total", date: new Date() } },
          { $merge: { into: "tickets" } }
        ]);
    
        return ticket ? res.response200(ticket): res.response404()
      } catch (error) {
        return next(error);
      }
    });
  }
}

const ticketsRouter = new TicketsRouter();

export default ticketsRouter.getRouter();