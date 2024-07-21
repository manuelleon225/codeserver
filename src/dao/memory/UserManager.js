import crypto from "crypto";
import CustomError from "../../utils/errors/CustomError";
import errors from "../../utils/errors/Errors";

class UserManager {
  static #users = [];
  create(data) {
    try {
      if (!data.email || !data.password) {
        return new CustomError(errors.missingData);
      } else {
        const newUser = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo || "user_default.jpg",
          email: data.email,
          password: data.password,
          role: data.role || "0",
        };
        UserManager.#users.push(newUser);
        console.log("user createad (memory)");
      }
    } catch (error) {
      throw error;
    }
  }
  read() {
    try {
      if (UserManager.#users.length == 0) {
        return new CustomError(errors.notFound);
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const userFound = UserManager.#users.find((user) => user.id == id);
      if (!userFound) {
        return new CustomError(errors.notFound);
      } else {
        return userFound;
      }
    } catch (error) {
      throw error;
    }
  }
  destroy(id) {
    try {
      const userFound = UserManager.#users.find((user) => user.id == id);
      if (!userFound) {
        return new CustomError(errors.notFound);
      } else {
        UserManager.#users = UserManager.#users.filter((user) => user.id != id);
        return UserManager.#users;
      }
    } catch (error) {
      throw error;
    }
  }

  update(uid, data) {
    try {
      const userToUpdate = UserManager.#users.find((user) => user.id == uid);
      if (userToUpdate) {
        Object.assign(userToUpdate, data);
        return userToUpdate;
      }
    } catch (error) {
      throw error;
    }
  }

  paginate({ filter, opts }) {
    try {
      let filteredUsers = MemoryManager.#users;

      if (filter) {
        filteredUsers = filteredUsers.filter((user) => {
          return Object.keys(filter).every((key) => user[key] === filter[key]);
        });
      }

      const total = filteredUsers.length;
      const page = opts.page || 1;
      const limit = opts.limit || 10;
      const offset = (page - 1) * limit;

      const paginatedUsers = filteredUsers.slice(offset, offset + limit);

      return {
        docs: paginatedUsers,
        totalDocs: total,
        limit: limit,
        page: page,
        totalPages: Math.ceil(total / limit),
        pagingCounter: offset + 1,
        hasPrevPage: page > 1,
        hasNextPage: page < Math.ceil(total / limit),
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
      };
    } catch (error) {
      throw error;
    }
  }
  readByEmail(email) {
    try {
      const user = MemoryManager.#users.find(
        (user) => user.email === email
      );

      if (!user) {
        return new CustomError(errors.notFound);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

/*const gestorDeUsuarios = new UserManager()
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
console.log(gestorDeUsuarios.read()) */