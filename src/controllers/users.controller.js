import usersManager from "../data/mongo/managers/Users.manager.js";

class UsersController {

    async  read(req, res, next) {
        try {
          const { role } = req.query;
          const allUsers = await UsersManager.read(role);
          if (allUsers.length !== 0) {
            return res.response200(allUsers);
          } else {
            const error = new Error("NOT FOUND USERS");
            error.statusCode = 404;
            throw error;
          }
        } catch (err) {
          return next(err);
        }
      }
      
      async  readOne(req, res, next) {
        try {
          const { uid } = req.params;
          const userById = await UsersManager.readOne(uid);
          if (userById) {
            return res.response200(userById);
          } else {
            const error = new Error("NOT FOUND USER");
            error.statusCode = 404;
            throw error;
          }
        } catch (err) {
          return next(err);
        }
      }
      
      async  create(req, res, next) {
        try {
          const data = req.body;
          const newUser = await UsersManager.create(data);
          return res.response201(`User created with ID: ${newUser.id} || Email: ${newUser.email} || Photo: ${newUser.photo} || Role: ${newUser.role} || Password: ${newUser.password}`)
        } catch (error) {
          return next(error);
        }
      }
      
      async  update(req, res, next) {
        try {
          const { uid } = req.params;
          const data = req.body;
          const userUpdate = await UsersManager.update(uid, data);
          return userUpdate ? res.response200(`User with ID: ${userUpdate.id} updated`) : res.response404()
        } catch (error) {
          return next(error);
        }
      }
      
      async  deleteUser(req, res, next) {
        try {
          const { uid } = req.params;
          const userToDelete = await UsersManager.destroy(uid);
          return userToDelete ? res.response200(userToDelete) : res.response404()
        } catch (error) {
          return next(error);
        }
      }
      
}

const usersController = new UsersController();
const { read, readOne, create, update, deleteUser } = usersController;
export { read, readOne, create, update, deleteUser };