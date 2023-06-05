let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
router.get('/dashboard', function(req, res, next) {
  let userId = req.session.user_id; // get user ID from session
  let sql2 = "SELECT * FROM bet.account WHERE id = " + userId;
  let sql3 = "SELECT balance FROM bet.balance WHERE  id = " + userId;
  db.query(sql2, function (err, userData) {
    if (err) throw err;
    console.log(userId);
    db.query(sql3, function (err, amountData) {
      if (err) throw err;
      res.render('dashboard', {
        title: 'Transactions List',
        userData: userData[0],
        amountData: amountData[0] // assuming the SQL query returns only one row
      });
    });
  });
});
router.get('/logout', function(req, res) {
  // destroy the user's session to log them out
  req.session.destroy(function(err) {
    if (err) {
    res.status(500).send('Failed to log out');
    } else {
    // redirect the user to the login page after logging out
    res.redirect('/login/login');
    }
    setTimeout(() => {
      res.redirect('/login/login');
    }, 30000);
  });
  });
module.exports = router;
