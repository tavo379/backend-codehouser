import * as productDaoMongo from './mongodb/productDaoMongo.js';
import * as userDaoMongo from './mongodb/userDaoMongo.js';
import * as cartDaoMongo from './mongodb/cartDaoMongo.js';
import { conectionMongoose } from './mongodb/conection.js';

import * as productDaoFS from './filesystem/productDaoFS.js';
import * as userDaoFS from './filesystem/userDaoFS.js';
import * as cartDaoFS from './filesystem/cartDaoFS.js';

const daos = {
  file: {
    userDao: userDaoFS,
    prodDao: productDaoFS,
    cartDao: cartDaoFS,
  },
  mongo: {
    async init() {
      console.log('Inicializando conexión MongoDB...');
      await conectionMongoose();
      return {
        userDao: userDaoMongo,
        prodDao: productDaoMongo,
        cartDao: cartDaoMongo,
      };
    },
  },
};

// Logging de información sobre la persistencia seleccionada
const selectedPersistence = process.argv[3] || 'mongo';

console.log('Persistencia seleccionada:', selectedPersistence);



// Selección del tipo de persistencia y sus DAOs asociados
const selectedDAOs = daos[selectedPersistence] || daos.mongo;

// Inicialización de los DAOs seleccionados
const initializeDAOs = async () => {
  console.log('Inicializando DAOs...');
  if (selectedDAOs.init) {
    return await selectedDAOs.init();
  }
  return selectedDAOs;
};


// Exportación de los DAOs seleccionados o inicialización si es necesario
export default await initializeDAOs();
