let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
router.get('/betting', function(req, res, next) {
    // Get the search query parameter from the request
    const searchQuery = req.query.search;
  
    // Build the SQL query based on the search query parameter
    const sqlQuery = `SELECT * FROM bet.markets`;
  
    // Execute the SQL query to fetch the data
    // Assuming you are using a database connection pool, you can replace 'pool' with your actual pool variable
    db.query(sqlQuery, function(error, results, fields) {
      if (error) {
        // Handle the error
        console.error('Error executing the SQL query:', error);
        // Optionally, you can redirect or render an error page
      } else {
        // Transform the fetched data to the expected structure
        const markets = results.map(market => ({
          marketid: market.marketid,
          names: [market.marketname] // Assuming marketname is the column name in the database table
        }));
  
        // Pass the transformed data to the EJS template for rendering
        res.render('betting', { markets: markets });
      }
    });
  });
  
  
router.post('/betting', function(req, res, next) {

  res.redirect('/betting'); 
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