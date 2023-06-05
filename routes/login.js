let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
router.get('/login', function(req, res, next) {
    res.render('login');
 
});
router.use('/login', function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  
  db.query(`SELECT id FROM bet.account WHERE email = '${email}'`, function(err, results) {
      if (err) throw err;
      
      let userId = results[0].id; // Assuming you expect a single row as a result
      
      console.log(`User id = ${userId}`);
      console.log(password, email, userId);
      
      next();
  });
});
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let userId = req.session.user_id; 
  // Here, you would typically perform database operations to check if the email and password match in your account table
  // Replace this code with your own logic to query the database and validate the credentials

  // Example check (replace it with your own database query)
  if (email && password) {
    // Execute SQL query that'll select the account from the database based on the specified email
    db.query('SELECT * FROM bet.account WHERE email = ?', [email], function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;

      // If the account exists
      if (results.length > 0) {
        const user = results[0];
         
        // Check if the password matches
        if (password === user.password) {
          // Set session variable to indicate successful login
          req.session.loggedin = true;
          let userId = results[0].id;
          req.session.user_id = userId;
          res.redirect('/dashboard/dashboard');
        } else {
          // Incorrect password
          res.send('Incorrect password');
        }
      } else {
        // Account not found
        res.send('Account not found');
      }
    });
  } else {
    // Missing email or password
    res.send('Email and password are required');
  }
});

module.exports = router;
