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
            message: "Logged In!",
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
              message: "Is ONLINE!",
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
              message: "Signed out!",
            });
          } 
            return CustomError.new("Not logged in", 401);
        } catch (error) {
          return next(error);
        }
      }; 

      async sendMail(req, res, next) {
        try {
          return res.json({
            statusCode: 200,
            message: "Code sent to your email!",
          })
        } catch (error) {
          return next(error);
        }
      }

      async verifyCode(req, res, next) {
        try {
          return res.json({
            statusCode: 200,
            message: "Code verified successfully!",
          })
        } catch (error) {
          return next(error);
        }
      }

      async newPassword(req, res, next) {
        try {
          return res
          .cookie("token", req.user.token, {signedCookie: true})
          .json({
            statusCode: 200,
            
            message: "Password changed successfully!",
          })
        } catch (error) {
          return next(error);
        }
      }
}

const sessionsController = new SessionsController();
const { register,login, online, signout, sendMail, verifyCode, newPassword }  = sessionsController;
export { register,login,online,signout, sendMail, verifyCode, newPassword };



