let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
router.get('/reset', function(req, res, next) {
    let userId = req.session.user_id; // get user ID from session
    let sql2 = "SELECT * FROM bet.account WHERE id = " + userId;
   
    db.query(sql2, function (err, userData) {
      if (err) throw err;
      console.log(userId);
        res.render('reset', {
          title: 'Transactions List',
          userData: userData[0]
       // assuming the SQL query returns only one row
        });
      });
    });

router.post('/reset', (req, res) => {
  let userId = req.session.user_id;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res.send('<script>alert("New password and confirm password do not match"); window.location.href = "/reset/reset";</script>');
  }
  // Check if current password matches
  db.query("SELECT * FROM bet.account WHERE id =" +userId, (error, results) => {
    if (error) {
      console.error(error);
      return res.send('<script>alert("An error occurred while updating the password."); window.location.href = "/reset/reset";</script>');
    }
    // Check if the current password is correct
    const dbPassword = results[0].password;
    if (dbPassword !== currentPassword) {
      return res.send('<script>alert("Current password is incorrect."); window.location.href = "/reset/reset";</script>');
    }
    // Update the password
    db.query(`UPDATE account SET password = '${newPassword}' WHERE id = ${userId}`, (error, results) => {
      if (error) {
        console.error(error);
        return  res.send('<script>alert("An error occurred while updating the password."); window.location.href = "/reset/reset";</script>');
      }
      res.send('<script>alert("Password updated successfully"); window.location.href = "/reset/reset";</script>');
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
