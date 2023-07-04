let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
const axios = require('axios');
const convert = require('xml-js');
router.get('/dashboard', async (req, res, next) => {
  try {
    const userId = req.session.user_id; // get user ID from session

    // Query 1: Fetch user data
    const sql2 = "SELECT * FROM bet.account WHERE id = " + userId;
    const userData = await new Promise((resolve, reject) => {
      db.query(sql2, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      });
    });

    // Query 2: Fetch amount data
    const sql3 = "SELECT balance FROM bet.balance WHERE id = " + userId;
    const amountData = await new Promise((resolve, reject) => {
      db.query(sql3, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      });
    });

    // Query 3: Fetch league data
    const sql4 = "SELECT * FROM bet.leagues";
    const leagueData = await new Promise((resolve, reject) => {
      db.query(sql4, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data); // Resolve with the entire data array
        }
      });
    });

    // Render the dashboard.ejs template with the filtered data
    res.render('dashboard', {
      title: 'List',
      userData: userData,
      amountData: amountData,
      leagueData: leagueData
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error);

    // Render an error view or send an error response
    res.status(500).render('error', {
      error: 'Internal Server Error',
      message: 'An error occurred' // Add the message variable with an appropriate value
    });
  }
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
