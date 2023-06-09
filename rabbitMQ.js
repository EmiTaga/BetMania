const amqp = require('amqplib');

// async function connectRabbitMQ() {
//   try {
//     const connection = await amqp.connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server URL if necessary
//     const channel = await connection.createChannel();
//     return channel;
//   } catch (error) {
//     console.error('Error connecting to RabbitMQ:', error);
//     process.exit(1);
//   }
// }

module.exports = router;