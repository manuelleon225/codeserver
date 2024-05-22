import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const createHash = (password) => {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    return hash
}

export const verifyHash = (reqBodyPass, mongoPass) => {
    const verify = compareSync(reqBodyPass, mongoPass)
    return verify
}