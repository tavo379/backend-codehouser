import jwt from 'jsonwebtoken';
import config from '../utils/config.js';

export const generateToken = (users) => {
  const { _id } = users; 
  const tokenPayload = {
    userId: _id,
  };

  const token = jwt.sign(tokenPayload, config.auth.SECRET_KEY_JWT, {
    expiresIn: '20m',
  });
  console.log('pasó por token')
  return token;  
};


