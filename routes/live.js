const express = require('express');
const axios = require('axios');
let router = express.Router();
let db = require('../database');
const xml2js = require('xml2js');
const amqp = require('amqplib/callback_api');
const parser = require('fast-xml-parser');



const connectionParams = {
  hostname: 'inplay-rmq.lsports.eu',
  port: 5672,
  username: 'eminetaga6@gmail.com',
  password: 'Kdu2e@d84Er',
  vhost: 'Customers'
};

const queue = '_5051_';
let receivedData = []; // Array to store received data

router.get('/live', function(req, res) {
  let responseSent = false; // Flag to track if response has been sent

  amqp.connect(connectionParams, function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      console.log("Waiting for messages in queue:", queue);
      channel.consume(queue, function(msg) {
        console.log("Received message:");
        console.log("Header:", msg.properties.headers);
        const xmlBody = msg.content.toString();
        xml2js.parseString(xmlBody, function(error, result) {
          if (error) {
            throw error;
          }
          console.log("Body:", result);

          // Check if message body exists and contains MessageBody object before rendering
          const messageBody = result?.Message?.MessageBody;
          if (messageBody && !responseSent) {
            responseSent = true; // Set the flag to indicate that a response has been sent
            // Pass the message body to your EJS template for rendering
            res.render('live', { receivedData: { messageBody } });
          } else if (!responseSent) {
            responseSent = true; // Set the flag to indicate that a response has been sent
            // Handle the case when message body is missing or empty
            res.render('live', { receivedData: null });
          }

          // Access the contents of the MessageBody object
          if (messageBody) {
            console.log("Contents of MessageBody:");
            console.log(messageBody);
          }
          console.log("Header:");
if (msg.properties.headers) {
  Object.keys(msg.properties.headers).forEach(key => {
    console.log(key + ":");
    console.log(msg.properties.headers[key]);
  });
} else {
  console.log("No headers found");
}

        });
      }, {
        noAck: true
      });
    });
  });
});





// router.get('/live', (req, res) => {
//   const liveMatches = [];

//   amqp.connect(connectionParams, (err, connection) => {
//     if (err) {
//       console.error('Failed to connect to RabbitMQ:', err);
//       return res.redirect('/live?error=RabbitMQ%20connection%20error');
//     }

//     connection.createChannel((err, channel) => {
//       if (err) {
//         console.error('Failed to create channel:', err);
//         connection.close();
//         return res.redirect('/live?error=RabbitMQ%20channel%20error');
//       }

//       channel.assertQueue(queue, { durable: false });

//       channel.consume(queue, (msg) => {
//         const match = JSON.parse(msg.content.toString());
//         liveMatches.push(match);
//       }, { noAck: true });

//       // Close the connection when the client disconnects
//       res.on('close', () => {
//         channel.close();
//         connection.close();
//       });
//        console.log(liveMatches)
//       res.render('live', { liveMatches });
//     });
//   });
// });


// Example usage
// router.get('/live', async (req, res) => {
//   try {
//     const liveMatches = []; // Array to store the in-play matches

//     amqp.connect(connectionParams, function(error0, connection) {
//       if (error0) {
//         throw error0;
//       }
//       connection.createChannel(function(error1, channel) {
//         if (error1) {
//           throw error1;
//         }
//         console.log("Waiting for in-play messages in queue:", queue);
//         channel.consume(queue, async function(msg) {
//           try {
//             const xml = msg.content.toString();
//             const parser = new xml2js.Parser();
//             const result = await parser.parseStringPromise(xml);
//             const prematchData = result.Message;

//             // Check if the match is live and football
//             const isLiveFootball = prematchData.Header[0].Type[0] === 'L' && prematchData.Header[0].SportId[0] === '1';

//             if (isLiveFootball) {
//               console.log("Received in-play match:", prematchData);

//               // Extract relevant information from prematchData
//               const matchId = prematchData.MatchId[0];
//               const homeTeam = prematchData.HomeTeam[0];
//               const awayTeam = prematchData.AwayTeam[0];
//               const startTime = prematchData.StartTime[0];

//               // Create an object to represent the match
//               const match = {
//                 matchId,
//                 homeTeam,
//                 awayTeam,
//                 startTime
//               };

//               // Add the match to the liveMatches array
//               liveMatches.push(match);

//               // Send a real-time update to the client
//               res.io.emit('liveMatchUpdate', match);
//             }
//           } catch (error) {
//             console.error("Error parsing XML:", error);
//           }
//         }, {
//           noAck: true
//         });
//       });
//     });
//   } catch (error) {
//     // Handle any errors that occur during the RabbitMQ connection
//     console.error(error);
//     return res.status(500).send('Internal Server Error');
//   }
// });
// const express = require('express');
// const router = express.Router();
// const amqp = require('amqplib/callback_api');
// const axios = require('axios');
// const convert = require('xml-js');

// // const connectionParams = {
// //   hostname: 'inplay-rmq.lsports.eu',
// //   port: 5672,
// //   username: 'eminetaga6@gmail.com',
// //   password: 'Kdu2e@d84Er',
// //   vhost: 'Customers'
// // };

// // const queue = '_5051_';

// // async function processMessage(msg, res) {
// //   try {
// //     // Extract the XML data from the received message
// //     const xmlData = msg.content.toString();

// //     // Parse the XML data into JSON
// //     const options = { compact: true, ignoreComment: true, ignoreCdata: true };
// //     const parsedData = convert.xml2js(xmlData, options);

// //     // Log the parsed XML data for debugging
// //     console.log('Parsed XML Data:', parsedData);

// //     // Extract the relevant information from the parsed XML
// //     const feed = parsedData.Feed;

// //     // Log the extracted feed data for debugging
// //     console.log('Feed Data:', feed);

// //     // Render the live.ejs template with the feed data
// //     res.render('live', { feed });
// //   } catch (error) {
// //     // Log the error for debugging
// //     console.error('Error:', error);

// //     // Render an error view or send an error response
// //     res.status(500).render('error', { error: 'Internal Server Error' });
// //   }
// // }
// const WebSocket = require('ws');

// const connectionParams = {
//   hostname: 'inplay-rmq.lsports.eu',
//   port: 5672,
//   username: 'eminetaga6@gmail.com',
//   password: 'Kdu2e@d84Er',
//   vhost: 'Customers'
// };

// const queue = '_5051_';

// async function processMessage(msg, res) {
//   // Your message processing logic here
//   // ...
// }

// // Establish a WebSocket connection
// const ws = new WebSocket(`wss://${connectionParams.hostname}:${connectionParams.port}`, {
//   headers: {
//     'Authorization': `Basic ${Buffer.from(`${connectionParams.username}:${connectionParams.password}`).toString('base64')}`
//   }
// });

// ws.on('open', function () {
//   console.log('WebSocket connection established');

//   // Create a channel
//   ws.send(JSON.stringify({ command: 'create_channel', queue_name: queue }));
// });

// ws.on('message', function (message) {
//   const data = JSON.parse(message);
//   const msg = {
//     content: Buffer.from(data.payload, 'base64')
//   };

//   console.log('Received message:');
//   console.log('Header:', data.headers);
//   console.log('Body:', msg.content.toString());

//   // Call the processMessage function with the received message and the response object
//   processMessage(msg);
// });

// ws.on('close', function () {
//   console.log('WebSocket connection closed');
// });

// // Example usage of the processMessage function
// function exampleUsage() {
//   const exampleMsg = {
//     content: Buffer.from('<xml>...</xml>') // Replace with your actual XML data
//   };

//   processMessage(exampleMsg, { render: (template, data) => { console.log('Rendering', template, 'with', data); } });
// }

// router.get('/live', (req, res) => {
//   try {
//     // Make a request to the live/in-play API
//     const url = 'https://inplay.lsports.eu/OddService/GetEvents';
//     const params = {
//       username: 'eminetaga6@gmail.com',
//       password: 'Kdu2e@d84Er',
//       guid: '3028f33b-e729-4dd3-81bf-1c198ef22af7',
//       timestamp: '06/08/2023',
//       fromdate: '06/08/2023',
//       todate: '06/08/2023',
//       sports: 'Football',
//       markets: '1'
//     };

//     axios.get(url, { params })
//       .then(response => {
//         // Extract the XML data from the response
//         const xmlData = response.data;

//         // Parse the XML data into JSON
//         const options = { compact: true, ignoreComment: true, ignoreCdata: true };
//         const parsedData = convert.xml2js(xmlData, options);

//         // Log the parsed XML data for debugging
//         console.log('Parsed XML Data:', parsedData);

//         // Extract the relevant information from the parsed XML
//         const feed = parsedData.Feed;

//         // Log the extracted feed data for debugging
//         console.log('Feed Data:', feed);

//         // Render the live.ejs template with the feed data
//         res.render('live', { feed });
//       })
//       .catch(error => {
//         // Log the error for debugging
//         console.error('Error:', error);

//         // Render an error view or send an error response
//         res.status(500).render('error', { error: 'Internal Server Error' });
//       });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error:', error);

//     // Render an error view or send an error response
//     res.status(500).render('error', { error: 'Internal Server Error' });
//   }
// });

// amqp.connect(connectionParams, function (error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function (error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     console.log("Waiting for messages in queue:", queue);
//     channel.consume(queue, function (msg) {
//       console.log("Received message:");
//       console.log("Header:", msg.properties.headers);
//       console.log("Body:", msg.content.toString());

//       // Call the processMessage function with the received message and the response object
//       processMessage(msg); // Pass the 'res' object to the processMessage function
//     }, {
//       noAck: true
//     });




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