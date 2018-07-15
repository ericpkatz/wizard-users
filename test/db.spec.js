const expect = require('chai').expect;
const db = require('../db');

describe('database', ()=> {
  beforeEach(()=> {
    db.resetUsers();
  });
  describe('findAllUsers', ()=> {
    it('has three users', ()=> {
      const users = db.findAllUsers();
      expect(users.length).to.equal(3);
      expect(users).to.eql([
        { id: 1, name: 'moe' },
        { id: 2, name: 'larry' },
        { id: 3, name: 'curly' },
      ]);
    });
  });

  describe('findUser', ()=> {
    it('finds a user by id', ()=> {
      const user = db.findUser(1);
      expect(user).to.eql({ id: 1, name: 'moe' });
    });
  });

  describe('createUser', ()=> {
    it('creates a new user with an id of 4', ()=> {
      const shep = db.createUser('shep');
      expect(shep.id).to.equal(4);
      const users = db.findAllUsers();
      expect(users.length).to.equal(4);
    });
  });
  describe('deleteUser', ()=> {
    it('removes a user based on id', ()=> {
      db.deleteUser(1);
      const users = db.findAllUsers();
      expect(users.length).to.equal(2);
    });
  });
});


