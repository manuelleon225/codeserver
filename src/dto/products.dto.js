import argsUtil from "../utils/args.util.js";
import crypto from 'crypto'

const persistence = argsUtil.persistence;

export class ProductDTO {
    constructor(data){
        (persistence !== 'mongo') && (this._id = crypto.randomBytes(12).toString("hex"));
        this.title = data.title;
        this.photo = data.photo || "https://back.tiendainval.com/backend/admin/backend/web/archivosDelCliente/items/images/20210108100138no_image_product.png",
        this.category = data.category;
        this.price = data.price || 1;
        this.stock = data.stock || 1;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}