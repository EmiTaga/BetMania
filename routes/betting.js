let express = require('express');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
router.get('/betting', function(req, res, next) {
  // Get the search query parameter from the request
  const userId = req.session.user_id;
  const searchQuery = req.query.search;
  // Build the SQL queries based on the search query parameter
  const sqlQuery1 = `SELECT * FROM bet.markets`;
  const sqlQuery2 = `SELECT * FROM bet.bets WHERE betslip_id =0 ;
  `;
  // Execute the SQL queries to fetch the data
  // Assuming you are using a database connection pool, you can replace 'pool' with your actual pool variable
  db.query(sqlQuery1, function(error1, results1, fields1) {
    if (error1) {
      // Handle the error for the first query
      console.error('Error executing the SQL query:', error1);
      // Optionally, you can redirect or render an error page
    } else {
      // Transform the fetched data from the first query to the expected structure
      const markets = results1.map(market => ({
        marketid: market.marketid,
        names: [market.marketname] // Assuming marketname is the column name in the database table
      }));

      // Execute the second query
      db.query(sqlQuery2, function(error2, results2, fields2) {
        if (error2) {
          // Handle the error for the second query
          console.error('Error executing the SQL query:', error2);
          // Optionally, you can redirect or render an error page
        } else {
          // Transform the fetched data from the second query to the expected structure
          const bets = results2.map(bet => ({
            id: bet.id,
            name: bet.name,
            price: bet.price,
            hometeam: bet.hometeam,
            awayteam: bet.awayteam
          }));
      console.log(bets)
          // Pass the transformed data to the EJS template for rendering
          res.render('betting', { markets: markets, bets: bets });
        }
      });
    }
  });
});


//ROUTER.POST WITHOUT API SQMO CONNECTION FOR UNIQUE ID GENERATION
router.post('/betting', function(req, res, next) {
  const isDeleteAction = req.query.delete === 'true';

  if (isDeleteAction) {
    const betIdToDelete = req.query.betId;

    // SQL query to delete the bet with the received ID
    const deleteQuery = `
      DELETE FROM bet.bets
      WHERE id = ?;
    `;

    db.query(deleteQuery, [betIdToDelete], function(error, result) {
      if (error) {
        console.error('Error executing the delete query:', error);
        res.sendStatus(500); // Send an internal server error response
      } else {
        console.log(`Deleted bet with ID: ${betIdToDelete}`);
        res.sendStatus(200); // Send a success response
      }
    });
  } else {
    // Handle other actions like inserting a new bet here
    const generatedId = req.body.generatedId; // Get the generated ID from the request body
    const amount_betslip = req.body.amount_betslip; // Get the selected amount from the request body
    const userId = req.session.user_id;

    // Define the query for inserting the bet
    const insertQuery = `
    INSERT INTO bet.betslips (amount_betslip, userid, total_price)
    SELECT ?, ?, SUM(price) AS total_price
    FROM bet.bets
    WHERE betslip_id = 0;`;
//     const insertQuery = `
//     INSERT INTO bet.betslips (amount_betslip, userid, total_price, amount_win)
//     SELECT ?, ?, EXP(SUM(LOG(price))), ? AS amount_win
//     FROM bet.bets
//     WHERE betslip_id = 0;
// `;

    console.log('Executing insert query with values:', amount_betslip, userId);
    
    // Execute the SQL insert query
    db.query(insertQuery, [amount_betslip, userId], (error, results) => {
      if (error) {
        console.error('Error executing the insert query:', error);
        return;
      }

      console.log('Inserted values:', {
        amount_betslip,
        userId,
        rowsAffected: results.affectedRows,
        insertedId: results.insertId,
      });

      // Define the update query to set betslip_id
      const updateQuery = `
      UPDATE bet.bets
      SET betslip_id = LAST_INSERT_ID()
      WHERE betslip_id = 0;`

      // Begin a transaction
      db.beginTransaction(function(error) {
        if (error) {
          console.error('Error starting the transaction:', error);
          // Handle the error or redirect/render an error page
        } else {
          // Execute the SQL update query within the transaction
          db.query(updateQuery, function(error, result) {
            if (error) {
              console.error('Error executing the update query:', error);
              db.rollback(function() {
                // Handle the error or redirect/render an error page
              });
            } else {
              // Transaction committed successfully
              db.commit(function(error) {
                if (error) {
                  console.error('Error committing the transaction:', error);
                  db.rollback(function() {
                    // Handle the error or redirect/render an error page
                  });
                } else {
                  console.log('Transaction committed successfully');
                  res.redirect('/betting/betting');
                }
              });
            }
          });
        }
      });
    });
  }
});





















































































//ROUTER.POST WITHOUT API SQMO CONNECTION FOR UNIQUE ID GENERATION
// router.post('/betting', function(req, res, next) {
//   const isDeleteAction = req.query.delete === 'true';

//   if (isDeleteAction) {
//     const betIdToDelete = req.query.betId;

//     // SQL query to delete the bet with the received ID
//     const deleteQuery = `
//       DELETE FROM bet.bets
//       WHERE id = ?;
//     `;

//     db.query(deleteQuery, [betIdToDelete], function(error, result) {
//       if (error) {
//         // Handle the error
//         console.error('Error executing the delete query:', error);
//         res.sendStatus(500); // Send an internal server error response
//       } else {
//         // Successful deletion
//         console.log(`Deleted bet with ID: ${betIdToDelete}`);
//         res.sendStatus(200); // Send a success response
//       }
//     });
//   } else {
//     // Handle other actions like inserting a new bet here
//     const generatedId = req.body.generatedId; // Get the generated ID from the request body
//     //const betId = req.params.id;
//     const amount_betslip = req.body.amount_betslip; // Get the selected amount from the request body
//     const userId = req.session.user_id;
//      console.log(userId,amount_betslip,betId)
//     // Define the queries for inserting the bet
//     const insertQuery = `
//     INSERT INTO bet.betslips (amount_betslip, userid, id_betslip)
//     SELECT ?, ?, b.betslip_id
//     FROM bet.bets b
//     WHERE b.betslip_id = (
//       SELECT betslip_id
//       FROM bet.bets
//       WHERE id = 1
//       LIMIT 1
//     );
//   `;
//   console.log('Executing insert query with values:', amount_betslip, userId);
//   // Execute the SQL insert query
// db.query(insertQuery, [amount_betslip, userId], (error, results) => {
//   if (error) {
//     console.error('Error executing the insert query:', error);
//     return;
//   }

//   // Log the inserted values
//   console.log('Inserted values:', {
//     amount_betslip,
//     userId,
//     rowsAffected: results.affectedRows,
//     insertedId: results.insertId,
//   });
// });

  
// const betId = req.params.id;
//     const updateQuery = `
//       UPDATE bet.bets
//       SET betslip_id = LAST_INSERT_ID()
//       WHERE betslip_id IS NULL;
//     `;

//     db.beginTransaction(function(error) {
//       if (error) {
//         // Handle the error
//         console.error('Error starting the transaction:', error);
//         // Optionally, you can redirect or render an error page
//       } else {
//         db.query(insertQuery, [amount_betslip, amount_betslip, userId, generatedId, betId], function(error, result) {
//           if (error) {
//             // Handle the error
//             console.error('Error executing the insert query:', error);
//             db.rollback(function() {
//               // Optionally, you can redirect or render an error page
//             });
//           } else {
//             // Successful insert operation
//             console.log(`Inserted bet with ID: ${betId}`);

//             // Execute the update query to set betslip_id
//             db.query(updateQuery, function(error, result) {
//               if (error) {
//                 // Handle the error
//                 console.error('Error executing the update query:', error);
//                 db.rollback(function() {
//                   // Optionally, you can redirect or render an error page
//                 });
//               } else {
//                 // Transaction committed successfully
//                 db.commit(function(error) {
//                   if (error) {
//                     // Handle the error
//                     console.error('Error committing the transaction:', error);
//                     db.rollback(function() {
//                       // Optionally, you can redirect or render an error page
//                     });
//                   } else {
//                     console.log('Transaction committed successfully');
//                     res.redirect('/betting/betting');
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// });


// const request = require('request'); // You may need to install the 'request' library
// router.post('/betting', function(req, res, next) {
//   const betId = req.params.bets;
//   const amount_betslip = req.body.amount_betslip;
//   const userId = req.session.user_id;

//   const insertQuery = `
//     INSERT INTO bet.betslips (amount_betslip, total_price, amount_win, userid)
//     SELECT ?, COALESCE(EXP(SUM(LOG(price))), 0), ? * COALESCE(EXP(SUM(LOG(price))), 0), ?
//     FROM bet.bets
//     WHERE id IN (?);
//   `;

//   db.beginTransaction(function(error) {
//     if (error) {
//       console.error('Error starting the transaction:', error);
//     } else {
//       db.query(insertQuery, [amount_betslip, amount_betslip, userId, betId], function(error, result) {
//         if (error) {
//           console.error('Error executing the insert query:', error);
//           db.rollback(function() {
//             // Handle rollback as needed
//           });
//         } else {
//           // Successful insert operation
//           console.log(`Inserted bet with ID: ${betId}`);

//           // After successful insert, gather the data and make a request to the API
//           const insertedData = {
//             betId: result.insertId, // Newly inserted row's ID
//             amount_betslip: amount_betslip,
//             userid: userId,
//           };

//           // Call the function to generate the unique ID
//           const uniqueId = generateUniqueCode(8); // Assuming you have the generateUniqueCode function defined
          
//           // Update the 'id_external' field with the generated unique ID
//           // Assuming you have a function to update the ID in the database
//           // updateIdExternal(result.insertId, uniqueId, function(updateError) {
//           //   if (updateError) {
//           //     console.error('Error updating id_external:', updateError);
//           //     db.rollback(function() {
//           //       // Handle rollback as needed
//           //     });
//           //   } else {
//           //     // Transaction committed successfully
//           //     db.commit(function(commitError) {
//           //       if (commitError) {
//           //         console.error('Error committing the transaction:', commitError);
//           //         db.rollback(function() {
//           //           // Handle rollback as needed
//           //         });
//           //       } else {
//           //         console.log('Transaction committed successfully');
//                   res.redirect('/betting/betting');
//                 }
//               });
//             }
//           });
//         }
//       //}
//       );
    //}
  //});
//});

//Function to generate a unique 8-character code
// function generateUniqueCode(length) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let uniqueCode = '';

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     uniqueCode += characters.charAt(randomIndex);
//   }

//   return uniqueCode;
// }




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

