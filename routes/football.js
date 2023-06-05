// Import necessary dependencies
const express = require('express');
const axios = require('axios');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
// Define your /football route handler
router.get('/football', async (req, res) => {
  try {
    // Make a request to the odds API
    const response = await axios.get('https://prematch.lsports.eu/OddService/GetLeagues?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7');

    // Log the API response for debugging
    console.log(response.data);

    // Pass the response data as an array with the key "leaguesData"
    res.render('football', { leaguesData: response.data });
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error);

    // Render an error view or send an error response
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
});


// router.get('/football', async (req, res) => {
//     try {
//       // Make a request to the odds API
//       const response = await axios.get('https://prematch.lsports.eu/OddService/GetLeagues?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7');
  
//       // Log the API response for debugging
//       const htmlData = convertToHtml(response.data);

//     // Render the football.ejs view and pass the converted HTML data
//     res.render('football', { leaguesHtml: htmlData });
//   } catch (error) {
//     // Handle any errors that occur during the API request
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Function to convert JSON data to HTML format
// function convertToHtml(jsonData) {
//   let html = '';

//   if (Array.isArray(jsonData)) {
//     // If jsonData is an array
//     html += '<ul>';
//     jsonData.forEach((item) => {
//       html += '<li>' + item.name + '</li>';
//     });
//     html += '</ul>';
//   } else {
//     // If jsonData is a single object
//     html += '<ul>';
//     html += '<li>' + jsonData.name + '</li>';
//     html += '</ul>';
//   }

//   return html;
// }

router.post('/football', function(req, res, next) {

    res.redirect('/football'); 
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
