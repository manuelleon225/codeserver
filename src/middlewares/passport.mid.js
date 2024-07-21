import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import userManager from "../dao/mongo/managers/Users.manager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken, verifyToken } from "../utils/token.util.js";
import environment from "../utils/env.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/Errors.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const error = new CustomError(errors.invalid);
          return done(error);
        }
        const userEmail = await userManager.readByEmail(email);
        if (userEmail) {
          const error = new CustomError("EMAIL ALREADY IN USE", 401);
          return done(error);
        }
        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        const newUser = await userManager.create(req.body);
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await userManager.readByEmail(email);
        if (!user) {
          return new CustomError(errors.auth);
        }
        const verify = verifyHash(password, user.password)
        if(verify){
          const userData = { email, role: user.role, photo: user.photo, _id: user._id, online: true}
          const token = createToken(userData)
          userData.token = token
          return done(null, userData)
        }
        return new CustomError(errors.invalid)
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
     secretOrKey: environment.SECRET_JWT
    },
    (data, done)=>{
      try {
        if(!data){
          return new CustomError(errors.forbidden);
        } 
        return done(null, data)
      } catch (error) {
        return done(error)
      }
    }
  )
)

export default passport;
