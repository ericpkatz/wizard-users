const express = require('express');
const app = express();
const db = require('./db');


app.get('/', (req, res, next)=> {
  const users = db.findAllUsers();
  res.send(`
    <html>
    <head>
    </head>
    <body>
      <ul>
        ${
          users.map(user => {
            return `
              <li>${ user.name }</li>
            `;
          })
        }
      </ul>
    </body>
    </html>
    `);
});

app.get('/users/:id', (req, res, next)=> {
  const user = db.findUser(req.params.id * 1);
  const users = [ user ];
  res.send(`
    <html>
    <head>
    </head>
    <body>
      <ul>
        ${
          users.map(user => {
            return `
              <li>${ user.name }</li>
            `;
          })
        }
      </ul>
    </body>
    </html>
    `);
});

module.exports = app;
