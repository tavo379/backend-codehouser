import { getUserByID } from "../persistance/daos/mongodb/userDaoMongo.js";
import { HttpResponse } from "../utils/http.response.js";
import error from "../utils/errors.dictionary.js";
import { logger } from "../utils/logger.js";

const logError = (error) => {
  logger.error ('Error Views Controller:', error);
throw error;
};


export const register = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    logError(error);
  }
};

export const errorRegister = async (req, res, next) => {
  try {
    res.render("errorRegister");
  } catch (error) {
    logError(error);
  }
};

export const login = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    logError(error);
  }
};

export const errorLogin = async (req, res, next) => {
  try {
    res.render("errorLogin");
  } catch (error) {
    logError(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const userExists = req.session;

    if (userExists) {
      const userID = await getUserByID(req.session.passport.users);
      const users = userID.toObject();
      res.render("current", { user });
    } else {
      res.redirect("/login"); 
    }
  } catch (error) {
    logError(error);
  }
};
