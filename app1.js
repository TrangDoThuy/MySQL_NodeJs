const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '511998',
  database: 'hualiang_project',
});

//Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

const app = express();

//Create db
// app.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE hualiang_project';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send('Database created ...');
//   });
// });

// Create table
app.get('/createProjectTable', (req, res) => {
  let sql =
    'CREATE TABLE project2(id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR (255),amountOfMoney INT,briefIntro LONGTEXT)';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Project table created...');
  });
});

// Insert project
app.get('/addProject', (req, res) => {
  let project_trial = {
    name: 'Lorem ipsum dolor sit amet',
    amountOfMoney: '1000',
    briefIntro:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet sagittis id consectetur purus. Enim ut sem viverra aliquet eget. Magnis dis parturient montes nascetur. Cras adipiscing enim eu turpis egestas. Adipiscing elit ut aliquam purus sit amet luctus venenatis. Ullamcorper malesuada proin libero nunc consequat interdum. Turpis massa tincidunt dui ut ornare lectus sit. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet.',
  };
  let sql = 'INSERT INTO project2 SET ?';
  let query = db.query(sql, project_trial, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('project 1 added');
  });
});

//Select projects
app.get('/getProjects', (req, res) => {
  let sql = 'SELECT * FROM project2';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Projects fetched...');
  });
});

// Select single post
app.get('/getProject/:id', (req, res) => {
  let sql = `SELECT * FROM project2 WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Projects fetched...');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
