let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
router.get('/bets', (req, res) => {
  // Query to select all data from game_bets table
  const query = 'SELECT * FROM bet.game_bets';

  // Execute the query using the database connection (db)
  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send('Error fetching data from database');
    }

    // Render EJS template with the retrieved data
    res.render('bets', { gameBets: rows });
  });
});

router.post('/bets', function(req, res, next) {

  res.redirect('/bets'); 
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
