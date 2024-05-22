import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userManager from "../data/mongo/managers/Users.manager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";

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
        const user = await userManager.readByEmail(req.body.email);
        if (!user) {
          const error = new Error("BAD AUTH");
          error.statusCode = 401;
          return done(error);
        }
        const verify = verifyHash(password, user.password)
        if(!verify){
            const error = new Error("INVALID CREDENTIALS")
            error.statusCode = 401
            return done(error)
        }
        if (req.session.email) {
            const error = new Error("Already logged in");
            error.statusCode = 401;
            return done(error);
        }
        req.session.email = email;
        req.session.online = true;
        req.session.role = user.role;
        req.session.photo = user.photo;
        req.session.user_id = user._id;
        return done(null, req.session) // cambie user a req.session
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
