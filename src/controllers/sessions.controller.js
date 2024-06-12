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
          console.log(req.user);
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
            console.log(req.user);
            return res.json({
              statusCode: 200,
              messsage: "Is ONLINE!",
              session: req.user
            });
          }
          const error = new Error("Is OFFLINE!");
          error.statusCode = 401;
          throw error;
        } catch (error) {
          return next(error);
        }
      };
    
      
      async  signout(req, res, next) {
        try {
          console.log(req.user, ' onli ');
          if (req.cookies["token"]) {
            return res
            .clearCookie("token")
            .json({
              statusCode: 200,
              messsage: "Signed out!",
            });
          } 
            const error = new Error("Not logged in");
            error.statusCode = 401;
            throw error;
          
        } catch (error) {
          return next(error);
        }
      }; 
}

const sessionsController = new SessionsController();
const { register,login, online, signout }  = sessionsController;
export { register,login,online,signout };



