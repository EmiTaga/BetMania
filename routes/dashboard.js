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

    // Make a request to the odds API
    const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=%20Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&sports=Football&leagues=%20Soccer%20Soccer%20League%20(MLS)&markets=1%2C2%2C3%2C4%2C5%2C6%2C7');

    // Extract the XML data from the response
    const xmlData = response.data;

    // Parse the XML data into JSON
    const options = { compact: true, ignoreComment: true, ignoreCdata: true };
    const parsedData = convert.xml2js(xmlData, options);

    // Log the parsed XML data for debugging
    console.log('Parsed XML Data:', parsedData);

    // Extract the relevant information from the parsed XML
    const feed = parsedData.Feed;
    const events = feed.Body.Event || []; // Access the 'Event' array correctly

    // Filter events based on LeagueId equal to 4 or 16814
    const filteredEvents = events.filter(
      event =>
        event.Fixture.League._attributes.Id === '16814' ||
        event.Fixture.League._attributes.Id === '34308'||
        event.Fixture.League._attributes.Id === '2944' ||
        event.Fixture.League._attributes.Id === '28575' ||
        event.Fixture.League._attributes.Id === '29649' ||
        event.Fixture.League._attributes.Id === '27363' ||
        event.Fixture.League._attributes.Id === '37606' ||
        event.Fixture.League._attributes.Id === '37615' ||
        event.Fixture.League._attributes.Id === '524'
    );

    // Log the filtered events for debugging
    console.log('Filtered Events:', filteredEvents);

    // Render the dashboard.ejs template with the filtered data
    res.render('dashboard', {
      title: 'Transactions List',
      userData: userData,
      amountData: amountData,
      feed: {
        ...feed,
        Body: {
          Event: filteredEvents
        }
      }
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
