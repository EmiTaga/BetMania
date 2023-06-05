let mysql = require('mysql2');

let conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'Avalon.32',      // Replace with your database password
  database: 'bet' // // Replace with your database Name
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

module.exports = conn;
