import argsUtil from "../utils/args.util.js";
import crypto from 'crypto'

const persistence = argsUtil.persistence;

export class CartDTO {
    constructor(data){
        (persistence !== 'mongo') && (this._id = crypto.randomBytes(12).toString("hex"));
        this.user_id = data.user_id || crypto.randomBytes(12).toString("hex"),
        this.product_id = data.product_id || crypto.randomBytes(12).toString("hex"),
        this.quantity = data.quantity || 1,
        this.state = data.state || "reserved",
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}