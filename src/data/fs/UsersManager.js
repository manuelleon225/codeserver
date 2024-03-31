import fs from "fs"
import crypto from "crypto"
const path = "./src/data/files/users.json"

class UserManager {
    constructor(path) {
        this.path = path,
            this.init()
    }
    init() {
        const exists = fs.existsSync(this.path);       
        if(!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
            console.log("File created");
        }
        return fs.promises.readFile(this.path, "utf-8")
    }
    async create(data) {
        try {
            if(!data.email || !data.password || !data.role){
                const error = new Error("ERROR: Faltan datos")
                throw error
            } else {
                const newUser = {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: data.photo || "user_default.jpg",
                    email: data.email,
                    password: data.password,
                    role: data.role
                }
                let fileUsers = await fs.promises.readFile(this.path, "utf-8")
                fileUsers = JSON.parse(fileUsers)
                fileUsers.push(newUser)
                fileUsers = JSON.stringify(fileUsers, null, 2)
                await fs.promises.writeFile(this.path, fileUsers)
                console.log("User created");
            }
        } catch (error) {
            throw error         
        }
    }
    async read(query) {
        try {
            let fileUsers = await fs.promises.readFile(this.path, "utf-8")
            fileUsers ? fileUsers = JSON.parse(fileUsers) : fileUsers;
            query ? fileUsers = fileUsers.filter((user) => user.role == query) : fileUsers
            return fileUsers
        } catch (error) {
            throw error
        }
    }
    async readOne(id) {
        try {
            let fileUsers = await fs.promises.readFile(this.path, "utf-8")
            fileUsers = JSON.parse(fileUsers)
            const userFound = fileUsers.find((user) => user.id == id)
            if (!userFound) {
                const error = new Error("No se encontro ningun usuario registrado con ese id")
                throw error
            } else {
                console.log(userFound);
                return userFound
            }
        } catch (error) {
            throw error
        }
    } 
    async destroy(id) {
        try {
            let fileUsers = await fs.promises.readFile(this.path, "utf-8")
            fileUsers = JSON.parse(fileUsers)
            const userFound =fileUsers.find((user)  => user.id == id )
            if(!userFound){
                const error = new Error("USER WITH THIS ID NOT FOUND")
                throw error 
            } else {
                fileUsers = fileUsers.filter((user) => user.id != id)
                fileUsers = JSON.stringify(fileUsers, null, 2)
                await fs.promises.writeFile(this.path, fileUsers)
                console.log(`Usuario eliminado: \n ID: ${id}\n NOMBRE: ${userFound.email}`);
                return fileUsers
            }
            
        } catch (error) {
            throw error
        }
    }
}

const userManager = new UserManager(path)
export default userManager