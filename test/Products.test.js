import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const request = supertest(app);

describe('Product Router', () => {
  let cookie;

  before(async () => {
    const loginResponse = await request
      .post('/api/users/loginApi')
      .send({ email: 'backend@coderhouse.com', password: 'mirepobackend' });

    cookie = loginResponse.headers['set-cookie'];

  });

  describe('POST /api/products/mockingproducts', () => {
    it('Debería crear 3 productos ficticios', async () => {
      const response = await request
        .post('/api/products/mockingproducts?cant=3')
        .set('Cookie', cookie);
      
        expect(response.status).to.equal(200);
        expect(response.body.data['Mock Products']).to.have.lengthOf(3);
    });
  });
  
  describe('GET /api/products/getmockingproducts', () => {
    it('Debería obtener un solo producto ficticio', async () => {
      const response = await request
        .get('/api/products/getmockingproducts')
        .set('Cookie', cookie);
  
      expect(response.status).to.equal(200);
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('_id');
      expect(response.body.data).to.have.property('title');
    });
  });
});
