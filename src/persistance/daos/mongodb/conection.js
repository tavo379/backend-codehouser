import { connect } from 'mongoose';
import config from '../../../utils/config.js';
import { logger } from '../../../utils/logger.js';

export const connectionString = config.mongo.MONGO_ATLAS_URL;

const logError = (error) => {
    logger.error('Error al conectar a la base de datos MongoDB:', error);
};

export const conectionMongoose = async () => {
    try {
        console.log('Intentando conectarse a MongoDB con URL:', connectionString);
        await connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        console.log('Conexión exitosa a la base de datos MongoDB.');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
        logError(error);
    }
};

