import { Router } from "express";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import config from "../utils/config.js";
import { getUserByID } from "../persistance/daos/mongodb/userDaoMongo.js";
import { logger } from "../utils/logger.js";
import {
  login,
  register,
  errorLogin,
  errorRegister,
} from "../controllers/viewsControllers.js";
import { logoutUserC } from "../controllers/userControllers.js";
import { getproductPaginate } from "../controllers/productControllers.js";

const viewsRouter = Router();
const logError = (error) => {
  logger.error("Error jwt:", error);
  throw error;
};

const cookieExtractor = (req) => req.cookies.token;

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: config.auth.SECRET_KEY_JWT,
};

const verifyToken = async (jwtPayload, done) => {
  try {
    console.log("Verificando token...");
    const users = await getUserByID(jwtPayload.userId);
    return users ? done(null, users) : done(null, false);
  } catch (error) {
    logError(error);
  }
};

passport.use("jwt", new JwtStrategy(strategyOptions, verifyToken));

passport.serializeUser((users, done) => {
  done(null, users._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = await getUserByID(id);
    return users ? done(null, users) : done(null, false);
  } catch (error) {
    logError(error);
  }
});

viewsRouter.get("/chat", (req, res) => {
  res.render("chat");
});

viewsRouter.get("/register", register);
viewsRouter.get("/error-register", errorRegister);
viewsRouter.get("/login", login);
viewsRouter.get("/error-login", errorLogin);
viewsRouter.get("/logout", logoutUserC);

viewsRouter.get("/products", passport.authenticate("jwt"), getproductPaginate);

export default viewsRouter;
