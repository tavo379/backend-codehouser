import {
  getUserByEmail,
  getUserByID,
} from "../persistance/daos/mongodb/userDaoMongo.js";
import {
  mailOptionsGmailLoginOk,
  transporterGmail,
} from "../services/emailServices.js";
import {
  createUsersMockService,
  getAllService,
  getUsersMocksService,
  loginUserServices,
} from "../services/userServices.js";
import { HttpResponse } from "../utils/http.response.js";
import error from "../utils/errors.dictionary.js";
import { logger } from "../utils/logger.js";

const logError = (error) => {
  logger.error("Error User Controller:", error);
  throw error;
};

const httpResponse = new HttpResponse();

export const logoutUserC = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

const sendEmailAfterLogin = async (email) => {
  const name = await getUserByEmail(email);
  // TODO: check sendEmail logic.
  // await transporterGmail.sendMail(mailOptionsGmailLoginOk(email, name));
};

export const loginApi = async (req, res) => {
  try {
    const token = await loginUserServices(req.body);

    if (!token) return httpResponse.Unauthorized(res, error.USER.CREDENTIALS);

    res.cookie("token", token, { httpOnly: true });
    // TODO: check sendEmail logic.
    // await sendEmailAfterLogin(req.body.email);
    return httpResponse.Ok(res, { token });
  } catch (error) {
    logError(error);
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUserServices(req.body);

    if (!token) return httpResponse.Unauthorized(res, error.USER.CREDENTIALS);

    res.cookie("token", token, { httpOnly: true });
    await sendEmailAfterLogin(req.body.email);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/products?page=1");
  } catch (error) {
    logError(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await getAllService();
    return httpResponse.Ok(res, data);
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const userExists = await req.session;
    const userID = await getUserByID(req.session.passport.user);
    const user = userID.toObject();

    if (userExists) {
      res.render("current", { user });
    } else {
      res.render("login");
    }
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const createUserMocks = async (req, res, next) => {
  try {
    const { cant } = req.query;
    const response = await createUsersMockService(cant);
    if (!response) return httpResponse.NotFound(res, error.USER.EXISTS);
    else return httpResponse.Ok(res, response);
  } catch (error) {
    next(error.message);
    logError(error);
  }
};

export const getUsersMocks = async (req, res, next) => {
  try {
    const response = await getUsersMocksService();
    if (!response) return httpResponse.NotFound(res, error.USER.NOT_FOUND);
    else return httpResponse.Ok(res, response);
  } catch (error) {
    next(error.message);
    logError(error);
  }
};
