import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmail,
  getUserByID,
  registerUser,
} from "../persistance/daos/mongodb/userDaoMongo.js";
import { HttpResponse } from "../utils/http.response.js";
import {
  mailOptionsGmailLoginOk,
  transporterGmail,
} from "../services/emailServices.js";
import error from "../utils/errors.dictionary.js";
import { logger } from "../utils/logger.js";

const httpResponse = new HttpResponse();

const logError = (error) => {
  logger.error("Error Passport local:", error);
  throw error;
};

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, password, done) => {
  try {
    const users = await getUserByEmail(email);
    if (users) return done(null, false);
    const newUser = await registerUser(req.body);
    return done(null, newUser);
  } catch (error) {
    logError(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const token = await loginUserServices(req.body);

    if (!token) {
      return httpResponse.Unauthorized(null, false, error.USER.CREDENTIALS);
    }

    const userEmail = req.body.email;
    const userName = await getUserByEmail(userEmail);

    await transporterGmail.sendMail(
      mailOptionsGmailLoginOk(userEmail, userName),
    );

    return httpResponse.Ok(null, { token });
  } catch (error) {
    logError(error);
  }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

passport.serializeUser((users, done) => {
  done(null, users._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserByID(id);
    return done(null, user);
  } catch (error) {
    logError(error);
  }
});
