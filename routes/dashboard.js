let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
router.get('/dashboard', function(req, res, next) {
  let userId = req.session.user_id; // get user ID from session
  let sql2 = "SELECT * FROM bet.account WHERE id = " + userId;
  let sql3 = "SELECT balance FROM bet.balance WHERE  id = " + userId;
  db.query(sql2, function (err, userData) {
    if (err) throw err;
    console.log(userId);
    db.query(sql3, function (err, amountData) {
      if (err) throw err;
      res.render('dashboard', {
        title: 'Transactions List',
        userData: userData[0],
        amountData: amountData[0] // assuming the SQL query returns only one row
      });
    });
  });
});
router.get('/dashboard', async (req, res) => {
  try {
    // Make a request to the odds API
    const response = await axios.get('https://prematch.lsports.eu/OddService/GetLeagues?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7');

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
