const expect = require('chai').expect; 
const supertest = require('supertest');
const app = supertest(require('../app'));
const db = require('../db');

describe('routes', ()=> {
  beforeEach(()=> {
    db.resetUsers();
  });
  describe('/', ()=> {
    it('exists', ()=> {
      return app.get('/')
        .expect(200)
        .then( resp => {
          expect(resp.text).to.contain('moe');
        });
    });
  });

  describe('/users/:id', ()=> {
    it('sends back a response with the user', ()=> {
      return app.get('/users/2')
        .expect(200)
        .then( resp => {
          expect(resp.text).to.contain('larry');
          expect(resp.text).not.to.contain('moe');
          expect(resp.text).not.to.contain('curly');
        });
    });
  });
});
