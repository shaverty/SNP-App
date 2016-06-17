//  index.js
//
//  Open connection to MySQL server and start it

var mysql      = require('mysql');
var express    = require('express');
var database   = require('./database/db')
var config     = require('./config/config')

//Holds connection settings to SQL
var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.port
});



//Connects to SQL
connection.connect(function(err){
  if(err){
    console.log('Error connecting to DB');
    return;
  }
  console.log('Connection established');
})

  console.log('Starting server.');
  new Promise(function(resolve, reject) {
    var app = express();
    var api = require('./api/api')(app, database);
    app.listen(3000)
  });


  console.log('Server started.');
