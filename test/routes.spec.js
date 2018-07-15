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

  describe('POST /users', ()=> {
    it('creates a user and redirects', ()=> {
      return app.post('/users')
        .send('name=shep')
        .expect(302)
        .then( resp => {
          const users = db.findAllUsers();
          const user = db.findUser(4);
          expect(user.name).to.equal('shep');
        });
    });
  });

  describe('DELETE /users', ()=> {
    it('deletes a user and redirects', ()=> {
      return app.delete('/users/1')
        .expect(302)
        .then( resp => {
          const users = db.findAllUsers();
          expect(users.length).to.equal(2);
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
