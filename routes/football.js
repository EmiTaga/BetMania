// Import necessary dependencies
const express = require('express');
const axios = require('axios');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
// Define your /football route handler
// router.get('/football', async (req, res) => {
//   try {
//     // Make a request to the odds API
//     const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&timestamp=06%2F08%2F2023&fromdate=06%2F08%2F2023&todate=06%2F08%2F2023&sports=Football&markets=1');

//     // Log the API response for debugging
//     console.log(response.data);

//     // Pass the response data as an array with the key "leaguesData"
//     res.render('football', { leaguesData: response.data });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error:', error);

//     // Render an error view or send an error response
//     res.status(500).render('error', { error: 'Internal Server Error' });
//   }
// });

// router.get('/football', async (req, res) => {
//   try {
//     // Make a request to the odds API
//     const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&timestamp=06%2F08%2F2023&fromdate=06%2F08%2F2023&todate=06%2F08%2F2023&sports=Football&markets=1');

//     // Extract the relevant data from the response
  

//    // Log leaguesData to check its value

//     const leaguesData = response.data && response.data.Events;

//     console.log('response:', response); // Log the entire response object
    
//     if (!leaguesData || leaguesData.length === 0) {
//       throw new Error('No matches available');
//     }

//     // Render the football.ejs template with the leaguesData
//     res.render('football', { leaguesData });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error:', error);

//     // Render an error view or send an error response
//     res.status(500).render('error', { error: 'Internal Server Error' });
//   }
// });
// const { parseString } = require('xml2js');
// router.get('/football', async (req, res) => {
//   try {
//     // Make a request to the odds API
//     const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&timestamp=06%2F08%2F2023&fromdate=06%2F08%2F2023&todate=06%2F08%2F2023&sports=Football&markets=1');

//     // Extract the XML data from the response
//     const xmlData = response.data;

//     // Parse the XML data
//     const result = await new Promise((resolve, reject) => {
//       parseString(xmlData, (err, result) => {
//         if (err) {
//           console.error('Error parsing XML:', err);
//           reject(err);
//         }
//         resolve(result);
//       });
//     });

//     // Log the parsed XML data for debugging
//     console.log('Parsed XML Data:', result);

//     // Extract the relevant information from the parsed XML
//     const feed = result.Feed;

//     // Log the extracted feed data for debugging
//     console.log('Feed Data:', feed);

//     // Render the football.ejs template with the feed data
//     res.render('football', { feed });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error:', error);

//     // Render an error view or send an error response
//     res.status(500).render('error', { error: 'Internal Server Error' });
//   }
// });






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
const convert = require('xml-js');

// ...

router.get('/football', async (req, res) => {
  try {
    // Make a request to the odds API
    const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&sports=Football&markets=1');

    // Extract the XML data from the response
    const xmlData = response.data;

    // Parse the XML data into JSON
    const options = { compact: true, ignoreComment: true, ignoreCdata: true };
    const parsedData = convert.xml2js(xmlData, options);

    // Log the parsed XML data for debugging
    console.log('Parsed XML Data:', parsedData);

    // Extract the relevant information from the parsed XML
    const feed = parsedData.Feed;

    // Log the extracted feed data for debugging
    console.log('Feed Data:', feed);

    // Render the football.ejs template with the feed data
    res.render('football', { feed });
  } catch (error) {
    // Log the error for debugging
    console.error('Error:', error);

    // Render an error view or send an error response
    res.status(500).render('error', { error: 'Internal Server Error' });
  }
});


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
