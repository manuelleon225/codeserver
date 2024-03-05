class UserManager {
    static #users = []
create(data){
    const user = {
        id : UserManager.#users.length === 0 ? 1: UserManager.#users[UserManager.#users.length -1].id+1
        foto : data.foto,
        email : data.email,
        password : data.password,
        role : 0 
    }
}
}