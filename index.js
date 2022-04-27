/*
In terminal,
>npm i express cors mysql2
>npm i -g nodemon
>nodemon server.js

Testing in Browser,
localhost:5000/users

git remote add clever git+ssh://git@push-n2-par-clevercloud-customers.services.clever-cloud.com/app_752d4717-3fdf-4ee4-afd1-64558b277c43.git
git push clever master
*/


var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
const PORT = process.env.PORT || 8080

const connection = mysql.createConnection({
  host: 'bxqe3614rbzbkznvhfw4-mysql.services.clever-cloud.com',
  port: '3306',
  user: 'up1qmuznxkkzmryv',
  password: '7LinUVp99Razv5aONCo5',
  database: 'bxqe3614rbzbkznvhfw4'
});

var app = express()
app.use(cors())
app.use(express.json())

app.get('/users', function (req, res, next) {
  connection.query(
    'SELECT * FROM `users`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/users/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `users` WHERE `id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/users', function (req, res, next) {
  connection.query(
    'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
    [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
    function(err, results) {
      res.json(results);
    }
  );
})

app.put('/users', function (req, res, next) {
  connection.query(
    'UPDATE `users` SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?, `avatar`= ? WHERE id = ?',
    [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.delete('/users', function (req, res, next) {
  connection.query(
    'DELETE FROM `users` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})

app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port '+PORT)
})