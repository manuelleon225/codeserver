import fs from "fs"
import crypto from "crypto"
import CustomError from "../../utils/errors/CustomError";
import errors from "../../utils/errors/Errors";
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
            if(!data.email || !data.password){
                return CustomError.new(errors.missingData)
            } else {
                const newUser = {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: data.photo || "user_default.jpg",
                    email: data.email,
                    password: data.password,
                    role: data.role || "0"
                }
                let fileUsers = await fs.promises.readFile(this.path, "utf-8")
                fileUsers = JSON.parse(fileUsers)
                fileUsers.push(newUser)
                fileUsers = JSON.stringify(fileUsers, null, 2)
                await fs.promises.writeFile(this.path, fileUsers)
                console.log("User created");
                return newUser;
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
                return CustomError.new(errors.notFound);
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
                return CustomError.new(errors.notFound)
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
    async update(uid, data){
        try {
            let allUsers = await this.read()
            const userToUpdate = allUsers.find(user => user.id == uid)
            Object.assign(userToUpdate, data)
            console.log(userToUpdate);
            allUsers = JSON.stringify(allUsers, null, 2)
            await fs.promises.writeFile(this.path, allUsers)
            return userToUpdate
        } catch (error) {
            throw error
        } 
    }
    async paginate({ filter, opts }) {
        try {
          let fileUsers = await fs.promises.readFile(this.path, "utf-8");
          fileUsers = fileUsers ? JSON.parse(fileUsers) : []; 
    
          if (filter) {
            fileUsers = fileUsers.filter((user) => {
              return Object.keys(filter).every((key) => user[key] === filter[key]);
            });
          }
    
          const total = fileUsers.length;
          const page = opts.page || 1;
          const limit = opts.limit || 10;
          const offset = (page - 1) * limit;
    
          const paginatedUser = fileUsers.slice(offset, offset + limit);
    
          return {
            docs: paginatedUser,
            totalDocs: total,
            limit: limit,
            page: page,
            totalPages: Math.ceil(total / limit),
            pagingCounter: offset + 1,
            hasPrevPage: page > 1,
            hasNextPage: page < Math.ceil(total / limit),
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < Math.ceil(total / limit) ? page + 1 : null
          };
        } catch (error) {
          throw error;
        }
      }    
      async readByEmail(email) {
        try {
          let fileUsers = await fs.promises.readFile(this.path, "utf-8");
          fileUsers = fileUsers ? JSON.parse(fileUsers) : [];
    
          const user = fileUsers.find((user) => user.email === email);

          if (!user) {
            return CustomError.new(errors.notFound);
          }
    
          return user;
        } catch (error) {
          throw error;
        }
      }
}

const userManager = new UserManager(path)
export default userManager