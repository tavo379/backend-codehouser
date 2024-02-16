import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import { getUserByEmail, registerUser } from "../persistance/daos/mongodb/userDaoMongo.js";
import 'dotenv/config';
import { loginUserServices } from "../services/userServices.js";
import { HttpResponse } from "../utils/http.response.js";
import error from "../utils/errors.dictionary.js";
import { logger } from "../utils/logger.js";

const logError = (error) => {
    logger.error ('Error passport github:', error);
  throw error;
  };

const httpResponse = new HttpResponse();

const strategyOptions = {
  clientID: process.env.GITHUB_STRATEGY_CLIENT_ID,
  clientSecret: process.env.GITHUB_STRATEGY_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_STRATEGY_CALLBACK_URL,
  passReqToCallback: true,
  scope: "users:email"
};

const registerOrLogin = async (req, accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const password = profile._json.node_id;
    const first_name = profile._json.name ? profile._json.name : profile._json.login;

    if (!email) return done(null, false);

    const users = await getUserByEmail(email);

    if (users) {
      const token = await loginUserServices({ email, password });

      if (!token) return httpResponse.Unauthorized(res, error.USER.CREDENTIALS);

      return done(null, users);
    }

    const newUser = await registerUser({
      first_name: first_name,
      last_name: " ",
      email,
      password: profile._json.node_id,
      isGithub: true,
    });

    return done(null, newUser);
  } catch (error) {
    logError(error);
    return done(error);
  }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
