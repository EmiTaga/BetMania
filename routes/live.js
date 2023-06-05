let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
// Example usage
router.get('/live', function(req, res, next) {
var channel, connection;
connectQueue()  // call the connect function
 
async function connectQueue() {
    try {
        connection = await amqp.connect("amqp://localhost:15672");
        channel    = await connection.createChannel()
        
        await channel.assertQueue("test-queue")
        
        channel.consume("test-queue", data => {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}

  res.render('live');
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