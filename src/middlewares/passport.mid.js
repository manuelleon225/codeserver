import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import userManager from "../dao/mongo/managers/Users.manager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken, verifyToken } from "../utils/token.util.js";
import environment from "../utils/env.util.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const error = new Error("MISSING DATA");
          error.statusCode = 400;
          return done(error);
        }
        const userEmail = await userManager.readByEmail(email);
        if (userEmail) {
          const error = new Error("EMAIL ALREADY IN USE");
          error.statusCode = 401;
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
          const error = new Error("BAD AUTH");
          error.statusCode = 401;
          return done(error);
        }
        const verify = verifyHash(password, user.password)
        if(verify){
          const userData = { email, role: user.role, photo: user.photo, _id: user._id, online: true}
          const token = createToken(userData)
          userData.token = token
          return done(null, userData)
        }
        const error = new Error("INVALID CREDENTIALS")
        error.statusCode = 401
        return done(error)
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
          const error = new Error("Forbidden from jwt!")
          error.statusCode = 403
          return done(error)
        } 
        return done(null, data)
      } catch (error) {
        return done(error)
      }
    }
  )
)

export default passport;
