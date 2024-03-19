import crypto from "crypto"

class UserManager {
    static #users = []
create(data){
     try {
        if (!data.email || !data.password || !data.role) {
            const error = new Error("Error: Faltan datos")
            throw error
        } else {
            const newUser = {
                id: crypto.randomBytes(12).toString("hex"),
                photo: data.photo || "user_default.jpg",
                email: data.email,
                password: data.password,
                role: data.role
            }
            UserManager.#users.push(user)
            console.log("user createad");
        }
        
     } catch (error) {
        throw error
     }
}
read(){
    try {
        if (UserManager.#users.length == 0) {
            const error = new Error("No hay usuarios registrados")
            throw error
        } else {
            return UserManager.#users
        }
        
    } catch (error) {
        throw error
    }
}

readOne(id){
    try{
        const userFound = UserManager.#users.find((user) => user.id == id)
        if(!userFound){
            const error = new Error("No hay ningun usuario registrado con ese id")
            throw error
        } else {
            return userFound
        }
    } catch(error){
        throw error
    }
}
destroy(id){
    try{
        const prodFound = UserManager.#users.find((user) => user.id == id)
        if(!userFound){
            const error = new Error("No hay ningun usuario registrado con ese id")
            throw error
        } else {
            UserManager.#users = UserManager.#users.filter((user) => user.id != id)
            return UserManager.#users
        }
    } catch(error){
        throw error
    }
}

}

const gestorDeUsuarios = new UserManager()
gestorDeUsuarios.create({
    photo: "default_photo.jpg",
    email: "manuel_leon@gmail.com",
    password: "123456",
    role: "usuario" 
})

gestorDeUsuarios.create({
    photo: "default_photo.jpg",
    email: "dali_98@gmail.com",
    password: "654321",
    role: "usuario"  
})

gestorDeUsuarios.create({
    photo: "default_photo.jpg",
    email: "juan_reina@gmail.com",
    password: "456789",
    role: "usuario"  
})

gestorDeUsuarios.create({
    photo: "default_photo.jpg",
    email: "jesus_mendina@gmail.com",
    password: "789456",
    role: "usuario"  
})

console.log(gestorDeUsuarios.read())
console.log(gestorDeUsuarios.destroy(2))
console.log(gestorDeUsuarios.read()) 