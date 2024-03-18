const fs = require("fs")
const crypto = require("crypto");
const path = "./app/files/users.json"

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
    async read() {
        try {
            let fileUsers = await fs.promises.readFile(this.path, "utf-8")
            fileUsers = JSON.parse(fileUsers)
            console.log(fileUsers);
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
                const error = new Error("No se encontro ningun usuario registrado con ese id")
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

async function test() {
    try {
        const userManager = new UserManager(path)
        await userManager.create({
            photo: "default_photo.jpg",
            email: "manuel_leon@gmail.com",
            password: "123456",
            role: "usuario"  
        })
        await userManager.create({
            photo: "default_photo.jpg",
            email: "dali_98@gmail.com",
            password: "654321",
            role: "usuario"  
        })
        await userManager.create({
            photo: "default_photo.jpg",
            email: "juan_reina@gmail.com",
            password: "456789",
            role: "usuario"  
        })
        await userManager.create({
            photo: "default_photo.jpg",
            email: "jesus_mendina@gmail.com",
            password: "789456",
            role: "usuario"  
        })
        await userManager.read()
        console.log("\n Read One \n");
        await userManager.readOne("3352bc96e4a319b6187722ed")
        console.log("\n Read One \n");
        await userManager.destroy("e9aa21d3c7e3ee7210a89909")
    } catch (error) {
        throw error
    }
}

test()