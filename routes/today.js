// Import necessary dependencies
const express = require('express');
const axios = require('axios');
let router = express.Router();
let db=require('../database');
const amqp = require('amqplib');
// Define your /football route handler
// router.get('/football', async (req, res) => {
//   try {
//     // Make a request to the odds API
//     const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&timestamp=06%2F08%2F2023&fromdate=06%2F08%2F2023&todate=06%2F08%2F2023&sports=Football&markets=1');

//     // Log the API response for debugging
//     console.log(response.data);

//     // Pass the response data as an array with the key "leaguesData"
//     res.render('football', { leaguesData: response.data });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error:', error);

//     // Render an error view or send an error response
//     res.status(500).render('error', { error: 'Internal Server Error' });
//   }
// });

// router.get('/football', async (req, res) => {
//   try {
//     // Make a request to the odds API
//     const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&timestamp=06%2F08%2F2023&fromdate=06%2F08%2F2023&todate=06%2F08%2F2023&sports=Football&markets=1');

//     // Extract the relevant data from the response
  

//    // Log leaguesData to check its value

//     const leaguesData = response.data && response.data.Events;

//     console.log('response:', response); // Log the entire response object
    
//     if (!leaguesData || leaguesData.length === 0) {
//       throw new Error('No matches available');
//     }

//     // Render the football.ejs template with the leaguesData
//     res.render('football', { leaguesData });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error:', error);

//     // Render an error view or send an error response
//     res.status(500).render('error', { error: 'Internal Server Error' });
//   }
// });
// const { parseString } = require('xml2js');
// router.get('/football', async (req, res) => {
//   try {
//     // Make a request to the odds API
//     const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&timestamp=06%2F08%2F2023&fromdate=06%2F08%2F2023&todate=06%2F08%2F2023&sports=Football&markets=1');

//     // Extract the XML data from the response
//     const xmlData = response.data;

//     // Parse the XML data
//     const result = await new Promise((resolve, reject) => {
//       parseString(xmlData, (err, result) => {
//         if (err) {
//           console.error('Error parsing XML:', err);
//           reject(err);
//         }
//         resolve(result);
//       });
//     });

//     // Log the parsed XML data for debugging
//     console.log('Parsed XML Data:', result);

//     // Extract the relevant information from the parsed XML
//     const feed = result.Feed;

//     // Log the extracted feed data for debugging
//     console.log('Feed Data:', feed);

//     // Render the football.ejs template with the feed data
//     res.render('football', { feed });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error:', error);

//     // Render an error view or send an error response
//     res.status(500).render('error', { error: 'Internal Server Error' });
//   }
// });






// router.get('/football', async (req, res) => {
//     try {
//       // Make a request to the odds API
//       const response = await axios.get('https://prematch.lsports.eu/OddService/GetLeagues?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7');
  
//       // Log the API response for debugging
//       const htmlData = convertToHtml(response.data);

//     // Render the football.ejs view and pass the converted HTML data
//     res.render('football', { leaguesHtml: htmlData });
//   } catch (error) {
//     // Handle any errors that occur during the API request
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Function to convert JSON data to HTML format
// function convertToHtml(jsonData) {
//   let html = '';

//   if (Array.isArray(jsonData)) {
//     // If jsonData is an array
//     html += '<ul>';
//     jsonData.forEach((item) => {
//       html += '<li>' + item.name + '</li>';
//     });
//     html += '</ul>';
//   } else {
//     // If jsonData is a single object
//     html += '<ul>';
//     html += '<li>' + jsonData.name + '</li>';
//     html += '</ul>';
//   }

//   return html;
// }
const convert = require('xml-js');

// ...

// router.get('/today', async (req, res) => {
//   try {
//     // Make a request to the odds API
//     const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&fromdate=06/14/2023&todate=06/14/2023&sports=Football&markets=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8');

//     // Extract the XML data from the response
//     const xmlData = response.data;

//     // Parse the XML data into JSON
//     const options = { compact: true, ignoreComment: true, ignoreCdata: true };
//     const parsedData = convert.xml2js(xmlData, options);

//     // Log the parsed XML data for debugging
//     console.log('Parsed XML Data:', parsedData);

//     // Extract the relevant information from the parsed XML
//     const feed = parsedData.Feed;

//     // Log the extracted feed data for debugging
//     console.log('Feed Data:', feed);

//     // Render the football.ejs template with the feed data
//     res.render('today', { feed });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error:', error);

//     // Render an error view or send an error response
//     res.status(500).render('error', { error: 'Internal Server Error' });
//   }
// });
//*************************************************************************************************** */
// router.get('/today', async (req, res) => {
//     try {
//       // Make a request to the odds API
//       const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&fromdate=06/14/2023&todate=06/14/2023&sports=Football&markets=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8');
  
//       // Extract the XML data from the response
//       const xmlData = response.data;
  
//       // Parse the XML data into JSON
//       const options = { compact: true, ignoreComment: true, ignoreCdata: true };
//       const parsedData = convert.xml2js(xmlData, options);
  
//       // Log the parsed XML data for debugging
//       console.log('Parsed XML Data:', parsedData);
  
//       // Extract the relevant information from the parsed XML
//       const feed = parsedData.Feed;
  
//       // Log the extracted feed data for debugging
//       console.log('Feed Data:', feed);
  
//       // Log the markets and bets data for debugging
//       if (feed && feed.Body && feed.Body.Event) {
//         feed.Body.Event.forEach(function (event) {
//           console.log('Event:', event); // Log the contents of each event object
  
//           if (event.Markets && event.Markets.Market) {
//             if (Array.isArray(event.Markets.Market)) {
//               event.Markets.Market.forEach(function (market) {
//                 console.log('Market:', market); // Log the contents of each market object
  
//                 if (market.Provider && market.Provider.Bet) {
//                   if (Array.isArray(market.Provider.Bet)) {
//                     market.Provider.Bet.forEach(function (bet) {
//                       console.log('Bet:', bet); // Log the contents of each bet object
//                     });
//                   } else {
//                     console.log('Bet:', market.Provider.Bet); // Log the bet object
//                   }
//                 }
//               });
//             } else {
//               console.log('Market:', event.Markets.Market); // Log the market object
  
//               if (event.Markets.Market.Provider && event.Markets.Market.Provider.Bet) {
//                 if (Array.isArray(event.Markets.Market.Provider.Bet)) {
//                   event.Markets.Market.Provider.Bet.forEach(function (bet) {
//                     console.log('Bet:', bet); // Log the contents of each bet object
//                   });
//                 } else {
//                   console.log('Bet:', event.Markets.Market.Provider.Bet); // Log the bet object
//                 }
//               }
//             }
//           }
//         });
//       }
  
//       // Render the football.ejs template with the feed data
//       res.render('today', { feed });
//     } catch (error) {
//       // Log the error for debugging
//       console.error('Error:', error);
  
//       // Render an error view or send an error response
//       res.status(500).render('error', { error: 'Internal Server Error' });
//     }
//   });
  
  //************************************************************************************************* */
  //************************************************************************************************* */
//   router.get('/today', async (req, res) => {
//     try {
//       // Make a request to the odds API
//       const response = await axios.get('https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&fromdate=06/14/2023&todate=06/14/2023&sports=Football&markets=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8');
  
//       // Extract the XML data from the response
//       const xmlData = response.data;
  
//       // Parse the XML data into JSON
//       const options = { compact: true, ignoreComment: true, ignoreCdata: true };
//       const parsedData = convert.xml2js(xmlData, options);
  
//       // Log the parsed XML data for debugging
//       console.log('Parsed XML Data:', parsedData);
  
//       // Extract the relevant information from the parsed XML
//       const feed = parsedData.Feed;
  
//       // Log the extracted feed data for debugging
//       console.log('Feed Data:', feed);
  
//       // Log the markets and bets data for debugging
//       if (feed && feed.Body && feed.Body.Event) {
//         feed.Body.Event.forEach(function (event) {
//           console.log('Event:', event); // Log the contents of each event object
  
//           if (
//             event.Fixture.League._attributes.Id === '2' ||
//             event.Fixture.League._attributes.Id === '4' ||
//             event.Fixture.League._attributes.Id === '8' ||
//             event.Fixture.League._attributes.Id === '59' ||
//             event.Fixture.League._attributes.Id === '61' ||
//             event.Fixture.League._attributes.Id === '65' ||
//             event.Fixture.League._attributes.Id === '67' ||
//             event.Fixture.League._attributes.Id === '68' ||
//             event.Fixture.League._attributes.Id === '97' ||
//             event.Fixture.League._attributes.Id === '123' ||
//             event.Fixture.League._attributes.Id === '135' ||
//             event.Fixture.League._attributes.Id === '147' ||
//             event.Fixture.League._attributes.Id === '210' ||
//             event.Fixture.League._attributes.Id === '270' ||
//             event.Fixture.League._attributes.Id === '271' ||
//             event.Fixture.League._attributes.Id === '279' ||
//             event.Fixture.League._attributes.Id === '348' ||
//             event.Fixture.League._attributes.Id === '438' ||
//             event.Fixture.League._attributes.Id === '2739' ||
//             event.Fixture.League._attributes.Id === '2901' ||
//             event.Fixture.League._attributes.Id === '2944' ||
//             event.Fixture.League._attributes.Id === '3316' ||
//             event.Fixture.League._attributes.Id === '3768' ||
//             event.Fixture.League._attributes.Id === '3779' ||
//             event.Fixture.League._attributes.Id === '3878' ||
//             event.Fixture.League._attributes.Id === '6603' ||
//             event.Fixture.League._attributes.Id === '8363' ||
//             event.Fixture.League._attributes.Id === '13967' ||
//             event.Fixture.League._attributes.Id === '14493' ||
//             event.Fixture.League._attributes.Id === '15179' ||
//             event.Fixture.League._attributes.Id === '20913' ||
//             event.Fixture.League._attributes.Id === '21833' ||
//             event.Fixture.League._attributes.Id === '22204' ||
//             event.Fixture.League._attributes.Id === '22411' ||
//             event.Fixture.League._attributes.Id === '22610' ||
//             event.Fixture.League._attributes.Id === '22736' ||
//             event.Fixture.League._attributes.Id === '26283' ||
//             event.Fixture.League._attributes.Id === '26379' ||
//             event.Fixture.League._attributes.Id === '26849' ||
//             event.Fixture.League._attributes.Id === '28206' ||
//             event.Fixture.League._attributes.Id === '30444' ||
//             event.Fixture.League._attributes.Id === '31004' ||
//             event.Fixture.League._attributes.Id === '32644' ||
//             event.Fixture.League._attributes.Id === '36412' ||
//             event.Fixture.League._attributes.Id === '38737' ||
//             event.Fixture.League._attributes.Id === '38745' ||
//             event.Fixture.League._attributes.Id === '43610' ||
//             event.Fixture.League._attributes.Id === '56889' ||
//             event.Fixture.League._attributes.Id === '64431' ||
//             event.Fixture.League._attributes.Id === '64900' ||
//             event.Fixture.League._attributes.Id === '68706'
//           ) {
//             console.log('League:', event.Fixture.League); // Log the league object
//             console.log('Event:', event); // Log the contents of each event object
  
//             if (event.Markets && event.Markets.Market) {
//               if (Array.isArray(event.Markets.Market)) {
//                 event.Markets.Market.forEach(function (market) {
//                   console.log('Market:', market); // Log the contents of each market object
  
//                   if (market.Provider && market.Provider.Bet) {
//                     if (Array.isArray(market.Provider.Bet)) {
//                       market.Provider.Bet.forEach(function (bet) {
//                         console.log('Bet:', bet); // Log the contents of each bet object
//                       });
//                     } else {
//                       console.log('Bet:', market.Provider.Bet); // Log the bet object
//                     }
//                   }
//                 });
//               } else {
//                 console.log('Market:', event.Markets.Market); // Log the market object
  
//                 if (event.Markets.Market.Provider && event.Markets.Market.Provider.Bet) {
//                   if (Array.isArray(event.Markets.Market.Provider.Bet)) {
//                     event.Markets.Market.Provider.Bet.forEach(function (bet) {
//                       console.log('Bet:', bet); // Log the contents of each bet object
//                     });
//                   } else {
//                     console.log('Bet:', event.Markets.Market.Provider.Bet); // Log the bet object
//                   }
//                 }
//               }
//             }
//           }
//         });
//       }
  
//       // Render the football.ejs template with the feed data
//       res.render('today', { feed });
//     } catch (error) {
//       // Log the error for debugging
//       console.error('Error:', error);
  
//       // Render an error view or send an error response
//       res.status(500).render('error', { error: 'Internal Server Error' });
//     }
//   });
  
router.get('/today', async (req, res) => {
    try {
      // Get the current date
      const currentDate = new Date();
  
      // Format the current date to match the API request parameters
      const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  
      // Make a request to the odds API
      const response = await axios.get(`https://prematch.lsports.eu/OddService/GetEvents?username=eminetaga6%40gmail.com&password=Kdu2e%40d84Er&guid=3028f33b-e729-4dd3-81bf-1c198ef22af7&sports=Football&markets=1%2C2%2C3%2C1566%2C306%2C7%2C128%2C56%2C5%2C2632%2C59%2C6`);
  
      // Extract the XML data from the response
      const xmlData = response.data;
  
      // Parse the XML data into JSON
      const options = { compact: true, ignoreComment: true, ignoreCdata: true };
      const parsedData = convert.xml2js(xmlData, options);
  
      // Extract the relevant information from the parsed XML
      const feed = parsedData.Feed;
  
      // Filter the events based on the desired league IDs and start date
      const desiredLeagueIds = [2, 4, 8, 59, 61, 65, 67, 68, 97, 123, 135, 147, 210, 270, 271, 279, 348, 438, 2739, 2901, 2944, 3316, 3768, 3779, 3878, 6603, 8363, 13967, 14493, 15179, 20913, 21833, 22204, 22411, 22610, 22736, 26283, 26379, 26849, 28206, 30444, 31004, 32644, 36412, 38737, 38745, 43610, 56889, 64431, 64900, 68706];
     // Filter the events based on the desired league IDs and start date
const filteredEvents = feed?.Body?.Event?.filter(event => {
    const eventDate = new Date(event.Fixture.StartDate._text);
    const eventStartDate = new Date(eventDate.setHours(0, 0, 0, 0)); // Set event start date time to 0
    const currentStartDate = new Date(currentDate.setHours(0, 0, 0, 0)); // Set current date time to 0
    return desiredLeagueIds.includes(parseInt(event.Fixture.League._attributes.Id)) && eventStartDate.getTime() === currentStartDate.getTime();
  });
  
      // Render the today.ejs template with the filtered events
      res.render('today', { feed: { Body: { Event: filteredEvents } }, message: 'Success' }); // Pass the 'message' variable and the filtered events to the template
    } catch (error) {
      // Log the error for debugging
      console.error('Error:', error);
  
      // Render an error view or send an error response
      res.status(500).render('error', { error: 'Internal Server Error', message: 'Error' }); // Pass the 'message' variable to the template
    }
  });
  
  
  
router.post('/today', function(req, res, next) {

    res.redirect('/today'); 
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
