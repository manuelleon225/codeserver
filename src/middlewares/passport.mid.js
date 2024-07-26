import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import userManager from "../dao/mongo/managers/Users.manager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken, verifyToken } from "../utils/token.util.js";
import environment from "../utils/env.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/Errors.js";
import { sendVerificationEmail } from "../services/email.service.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          const error = CustomError.new(errors.invalid);
          return done(error);
        }
        const userEmail = await userManager.readByEmail(email);
        if (userEmail) {
          const error = CustomError.new("EMAIL ALREADY IN USE", 401);
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
          const error = CustomError.new(errors.auth);
          return done(error)
        }
        const verify = verifyHash(password, user.password)
        if(verify){
          const userData = { email, role: user.role, photo: user.photo, _id: user._id, online: true}
          const token = createToken(userData)
          userData.token = token
          return done(null, userData)
        }
        const error = CustomError.new(errors.invalid);
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
          const error = CustomError.new(errors.forbidden)
          return done(error);
        } 
        return done(null, data)
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  "send_mail",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email", passwordField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await userManager.readByEmail(email);
        if (!user) {
          const error = CustomError.new(errors.invalid);
          return done(error)
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000); 
        await sendVerificationEmail(email, verificationCode);
        req.session.verificationCode = verificationCode;
        console.log(verificationCode, ' recover pass ');
        return done(null, user, { message: 'Verification email sent' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "verify_code",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "code", passwordField: "code" },
    async (req, email, password, done) => {
      try {
        const { code } = req.body;
        if (req.session.verificationCode == code) {
          return done(null, req.user, { statusCode: 200, message: 'Code verified successfully!' });
        } else {
          return done(null, false, { message: 'Invalid code' });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "new_password",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email", passwordField: "password" },
    async (req, email, password, done) => {
      try {
        delete req.session.verificationCode;
        let user = await userManager.readByEmail(email);
        console.log(user, ' user ');
        password = createHash(password)

        user.password = password

        userManager.update(user._id, user)
        user = await userManager.readByEmail(email);
        console.log(user, ' user after');

        const userData = { email, role: user.role, photo: user.photo, _id: user._id, online: true}
        const token = createToken(userData)
        userData.token = token
        return done(null, userData)
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
