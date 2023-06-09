let express = require('express');
let router = express.Router();
// const amqp = require('amqplib/callback_api');

// const connectionParams = {
//   hostname: 'prematch-rmq.lsports.eu',
//   port: 5672,
//   username: 'eminetaga6@gmail.com',
//   AutomaticRecoveryEnabled :true,
//   password: 'Kdu2e@d84Er',
//   vhost: 'Customers',
//   RequestedHeartbeat : 580
// };

// const queue = '_5050_';

// amqp.connect(connectionParams, function(error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function(error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     console.log("Waiting for messages in queue:", queue);
//     channel.consume(queue, function(msg) {
//       console.log("Received message:", msg.content.toString());
//     }, {
//       noAck: true
//     });
//   });
// });
// const amqp = require('amqplib/callback_api');

// const connectionParams = {
//   hostname: 'inplay-rmq.lsports.eu',
//   port: 5672,
//   username: 'eminetaga6@gmail.com',
//   password: 'Kdu2e@d84Er',
//   vhost: 'Customers'
// };

// const queue = '_5051_';

// amqp.connect(connectionParams, function(error0, connection) {
//   if (error0) {
//     throw error0;
//   }
//   connection.createChannel(function(error1, channel) {
//     if (error1) {
//       throw error1;
//     }
//     console.log("Waiting for messages in queue:", queue);
//     channel.consume(queue, function(msg) {
//       console.log("Received message:");
//       console.log("Header:", msg.properties.headers);
//       console.log("Body:", msg.content.toString());
//     }, {
//       noAck: true
//     });
//   });
// });
module.exports = router;
