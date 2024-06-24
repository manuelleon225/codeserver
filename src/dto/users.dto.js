import argsUtil from "../utils/args.util.js";
import crypto from 'crypto'
import { createHash } from "../utils/hash.util.js";

const persistence = argsUtil.persistence;

export class UserDTO {
    constructor(data){
        (persistence !== 'mongo') && (this._id = crypto.randomBytes(12).toString("hex"));
        this.email = data.email;
        this.password = createHash(data.password);
        this.role = data.role || 0;
        this.photo = data.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwb7VqZWWn6W92xv34aLhCXSrVGeArGHPhSKh4PysLQ&s";
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}