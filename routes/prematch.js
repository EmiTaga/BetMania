const express = require('express');
const axios = require('axios');
let router = express.Router();
let db=require('../database');
const xml2js = require('xml2js');
// Define your /football route handler
const amqp = require('amqplib/callback_api');

const connectionParams = {
  hostname: 'inplay-rmq.lsports.eu',
  port: 5672,
  username: 'eminetaga6@gmail.com',
  password: 'Kdu2e@d84Er',
  vhost: 'Customers'
};

const queue = '_5051_';

router.get('/prematch', async (req, res) => {
  try {
    amqp.connect(connectionParams, function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        console.log("Waiting for messages in queue:", queue);
        channel.consume(queue, async function(msg) {
          console.log("Received message:");
          console.log("Header:", msg.properties.headers);
          console.log("Body:", msg.content.toString());
        
          try {
            const xml = msg.content.toString();
        
            const parser = new xml2js.Parser();
            const result = await parser.parseStringPromise(xml);
            const prematchData = result.Message; // Assign the parsed data to prematchData
        
            console.log("Parsed data:", prematchData);
        
            // Render the prematch.ejs view and pass the extracted data
            res.render('prematch', { matches: prematchData.Header });
        
            return; // Add this line to stop further execution
          } catch (error) {
            console.error("Error parsing XML:", error);
            return res.status(500).send('Internal Server Error');;
          }
        }, {
          noAck: true
        });
        
      });
    });
  } catch (error) {
    // Handle any errors that occur during the RabbitMQ connection
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// router.get('/prematch', async (req, res) => {
//     try {
//       // Make a request to the odds API
//       const response = await axios.get('https://prematch.lsports.eu/OddService/GetFixtureMarkets?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&sports=Football&leagues=UEFA&markets=1%2C5%2C10%2C113');
  
//       // Log the API response for debugging
//       console.log(response.data);

//       const jsonData = JSON.stringify(response.data);
//       // Render the football.ejs view and pass the extracted data
//       res.render('prematch', { prematchJson: jsonData });
//     } catch (error) {
//       // Handle any errors that occur during the API request
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
router.post('/prematch', function(req, res, next) {

    res.redirect('/prematch'); 
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