let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
router.get('/statistics', function(req, res, next) {
    res.render('statistics');
 
});
router.post('/statistics', function(req, res, next) {

  res.redirect('/statistics'); 
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
