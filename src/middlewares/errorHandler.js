import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();


export const errorHandler = (error, req, res, next) => {
    console.error(error.stack);
    const status = error.statusCode || 500;
    return http.ServerError(res, error.message);
};
