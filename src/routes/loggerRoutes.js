import { Router } from "express";
import { logger } from "../utils/logger.js";
import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse();
const loggerRouter = Router()


loggerRouter.get('/', (req, res) => {
  logger.debug('RegistrarDebug');
  logger.http('RegistrarHttp');
  logger.info('RegistrarInfo');
  logger.warning('RegistrarWarning');
  logger.error('RegistrarError');
  logger.fatal('RegistrarFatalError');
  httpResponse.Ok(res, 'Prueba exitosa');
});

export default loggerRouter