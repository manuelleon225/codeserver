import CustomError from "../utils/errors/CustomError.js";

class SessionsController {
    async register(req, res, next) {
        try {
          return res.response201("registered");
        } catch (error) {
          return next(error);
        }
      }

    async login(req, res, next) {
        try {
          return res
          .cookie("token", req.user.token, {signedCookie: true})
          .json({
            statusCode: 201,
            messsage: "Logged In!",
            token: req.user.token
          });
        } catch (error) {
          return next(error);
        }
      }
    
      
      async  online(req, res, next) {
        try {
          if (req.user.online) {
            return res.json({
              statusCode: 200,
              messsage: "Is ONLINE!",
              session: req.user
            });
          }
          localStorage.getItem("online", "false")
          return CustomError.new("Is OFFLINE!", 401);
        } catch (error) {
          return next(error);
        }
      };
    
      
      async  signout(req, res, next) {
        try {
          if (req.cookies["token"]) {
            return res
            .clearCookie("token")
            .json({
              statusCode: 200,
              messsage: "Signed out!",
            });
          } 
            return CustomError.new("Not logged in", 401);
        } catch (error) {
          return next(error);
        }
      }; 

      async recoverPassword(req, res, next) {
        try {
          return res.json({
            statusCode: 200,
            messsage: "Sent!",
          })
        } catch (error) {
          return next(error);
        }
      }
}

const sessionsController = new SessionsController();
const { register,login, online, signout, recoverPassword }  = sessionsController;
export { register,login,online,signout, recoverPassword };



