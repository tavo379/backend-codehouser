import {
    mailOptionsEthereal,
    mailOptionsGmail,
    transporterEthereal,
    transporterGmail,
  } from "../services/emailServices.js";
import { HttpResponse } from "../utils/http.response.js";
import { logger } from "../utils/logger.js";

const logError = (error) => {
    logger.error ('Error email controllers:', error);
  throw error;
  };
  


  const httpResponse = new HttpResponse();
  
  const sendMail = async (transporter, mailOptions, req, res) => {
    try {
      const { dest, name } = req.body;
      const response = await transporter.sendMail(mailOptions(dest, name));
      return httpResponse.Ok(res, response);
    } catch (error) {
      logError(error);
    }
  };
  
  export const sendMailEthereal = async (req, res) => {
    return sendMail(transporterEthereal, mailOptionsEthereal, req, res);
  };
  
  export const sendMailGmail = async (req, res) => {
    return sendMail(transporterGmail, mailOptionsGmail, req, res);
  };
  