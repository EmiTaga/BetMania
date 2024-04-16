let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
const axios = require('axios');
const convert = require('xml-js');
const bodyParser = require('body-parser');
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

    // Query 3: Fetch league data
    const sql4 = "SELECT * FROM bet.game_tournaments";
    const leagueData = await new Promise((resolve, reject) => {
      db.query(sql4, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data); // Resolve with the entire data array
        }
      });
    });

    // Query 4: Fetch match data
    const sql5 = `
  SELECT matches.*, team1.name AS team1_name, team2.name AS team2_name,
  MAX(CASE WHEN market_desc.name = '1' THEN market.value END) AS price_1,
  MAX(CASE WHEN market_desc.name = 'X' THEN market.value END) AS price_X,
  MAX(CASE WHEN market_desc.name = '2' THEN market.value END) AS price_2
  FROM bet.game_matches AS matches
  INNER JOIN bet.game_teams AS team1 ON matches.team1_id = team1.id
  INNER JOIN bet.game_teams AS team2 ON matches.team2_id = team2.id
  LEFT JOIN bet.match_market AS market ON matches.id = market.matchid
  LEFT JOIN bet.market_description AS market_desc ON market.marketid = market_desc.id
  WHERE matches.id = market.matchid 
  GROUP BY matches.id, team1_name, team2_name; `;
    const matchData = await new Promise((resolve, reject) => {
      db.query(sql5, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
          
        }
      });
    });
    console.log(matchData)
    // Render the dashboard.ejs template with the filtered data
    res.render('dashboard', {
      title: 'List',
      userData: userData,
      amountData: amountData,
      leagueData: leagueData,
      matchData: matchData // Add matchData to the rendered template
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
router.post('/dashboard', (req, res) => {
  const { name, selectedPrice, hometeam, awayteam, matchid } = req.body;

  // Parse the selectedPrice value as a string instead of JSON
  const selectedData = JSON.parse(selectedPrice);

  // Iterate over the selectedData and insert each row into the database
  selectedData.forEach((data) => {
    const { price } = data;

    // Create an SQL query for each row
    const query = 'INSERT INTO bet.bets (name, price, hometeam, awayteam, matchid) VALUES (?, ?, ?, ?, ?)';
    const values = [name, price, hometeam, awayteam, matchid];

    // Execute the SQL query for each row
    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error saving data to the database:', error);
        res.status(500).send('Error saving data to the database.');
      } else {
        console.log('Data saved successfully!');
        res.redirect('/betting/betting');
      }
    });
  });
});






// router.post('/dashboard', (req, res) => {
//   // Extract the data from the request body
//   const {name} = req.body;

//   // Parse the selected data from the name field
//   const selectedData = JSON.parse(name);

//   // Create an array to store the bet objects
//   const bets = [];

//   // Create a new bet object for each selected data item
//   for (let data of selectedData) {
//     const { hometeam, awayteam, price } = data;
//     const bet = { hometeam, awayteam, price };
//     bets.push(bet);
//   }

//   // Insert the bet data into the MySQL database
//   db.query('INSERT INTO bet.bets (hometeam, awayteam, price,name ) VALUES ?', [bets.map(bet => [bet.hometeam, bet.awayteam, bet.price,bet.name])], (error, results) => {
//     if (error) {
//       console.error('Error inserting bet:', error);
//       res.status(500).json({ error: 'An error occurred while saving the bet.' });
//     } else {
//       res.status(200).json({ message: 'Bet saved successfully.' });
//     }
//   });
//   // res.render('/dashboard')
// });
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
