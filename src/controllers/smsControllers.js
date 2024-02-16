// import config from "../utils/config.js";
// import { twilioClient } from "../services/smsServices.js";
// import { HttpResponse } from "../utils/http.response.js";

// const httpResponse = new HttpResponse();

// export const sendSMS = async (req, res, next) => {
//     try {
//         const { message, dest } = req.body;
//         const twilioMessage = {
//             body: message,
//             from: config.twilio.PHONE,
//             to: dest
//         };
//         const response = await twilioClient.messages.create(twilioMessage);
//         return httpResponse.Ok(res, response);
//     } catch (error) {
//         next(error.message);
//     }
// };
