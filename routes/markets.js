const express = require('express');
const axios = require('axios');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
// Define your /football route handler
router.get('/markets', async (req, res) => {
    try {
      // Make a request to the odds API
      const response = await axios.get('https://prematch.lsports.eu/OddService/GetMarkets?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7');
  
      // Log the API response for debugging
      console.log(response.data);
      const jsonData = JSON.stringify(response.data);
      // Render the football.ejs view and pass the extracted data
      res.render('markets', { marketsJson:jsonData});
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
router.post('/markets', function(req, res, next) {

    res.redirect('/markets'); 
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