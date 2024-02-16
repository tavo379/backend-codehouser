import { Router } from "express";
import { sendMailEthereal, sendMailGmail } from "../controllers/emailControllers.js";
import passport from 'passport'

const emailRouter = Router();

emailRouter.use(passport.authenticate("jwt"));

emailRouter.post('/ethereal', sendMailEthereal);

emailRouter.post('/gmail', sendMailGmail);

export default emailRouter;
