import { logger } from "../utils/logger.js";
import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse();

import { Router } from "express";
const router = Router ()


router.get('/', (req, res) => {

logger.debug('RegistrarDebug');
logger.http('Registrarttp');
logger.info('RegistrarInfo');
logger.warning('RegistrarWarning');
logger.error('RegistrarError');
logger.fatal('RegistrarFatalError');

httpResponse.Ok(res, 'Prueba exitosa')

});

export default router