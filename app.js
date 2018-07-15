const express = require('express');
const app = express();
const db = require('./db');



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
      <ul>
        ${
          users.map(user => {
            return `
              <li>
                <a href='/users/${user.id}'>
                  ${ user.name }</li>
                </a>
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

module.exports = app;
