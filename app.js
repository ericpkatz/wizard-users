const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));



const view = (users)=> {
  return `
    <html>
    <head>
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css'></link>
    </head>
    <body>
      <div class='container'>
      <h1>
        <a href='/'>
          Wizard Users
        </a>
      </h1>
      <form method='POST' action='/users'>
        <div class='form-group'>
          <label>Name</label>
          <input name='name' class='form-control' />
        </div>
        <div class='form-group'>
          <input type='submit' value='Save' class='btn btn-primary'/>
        </div>
      </form>
      <ul>
        ${
          users.map(user => {
            return `
              <li>
                <a href='/users/${user.id}'>
                  ${ user.name }
                </a>
                <form method='POST' action='/users/${user.id}?_method=delete'>
                  <input type='submit' class='btn btn-warning' value='delete' />
                </form>
              </li>
            `;
          }).join('')
        }
      </ul>
      </div>
    </body>
    </html>
    `;
}
app.get('/', (req, res, next)=> {
  const users = db.findAllUsers();
  res.send(view(users));
});

app.get('/users/:id', (req, res, next)=> {
  const user = db.findUser(req.params.id * 1);
  res.send(view([ user ]));
});

app.post('/users', (req, res, next)=> {
  db.createUser(req.body.name);
  res.redirect('/');
});

app.delete('/users/:id', (req, res, next)=> {
  db.deleteUser(req.params.id*1);
  res.redirect('/');
});

module.exports = app;
