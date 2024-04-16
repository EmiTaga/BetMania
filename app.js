let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const amqp = require("amqplib");
let expressSession = require('express-session');
let indexRouter = require('./routes/index');
let signUpRouter = require('./routes/signup');
let loginRouter = require('./routes/login');
let betsRouter = require('./routes/bets');
let financeRouter = require('./routes/finance');
let liveRouter = require('./routes/live');
let resultsRouter = require('./routes/results');
let sportRouter = require('./routes/sport');
let statisticsRouter = require('./routes/statistics');
let transactionRouter = require('./routes/transaction');
let virtualRouter = require('./routes/virtual');
let dashboardRouter = require('./routes/dashboard');
let footballRouter = require('./routes/football');
let marketsRouter = require('./routes/markets');
let bookmarkRouter = require('./routes/bookmark');
let prematchRouter = require('./routes/prematch');
let rabbitmqRouter = require('./routes/rabbitmq')
let resetRouter = require('./routes/reset');
let todayRouter = require('./routes/today');
let bettingRouter = require('./routes/betting');
let app = express();
app.use(express.static('public'));
app.get('/', (req, res, next) => {
  if (req.path === '/') {
    return res.render('index'); // render the home.ejs view
  }
  next(); // continue with the next middleware in the stack
});
// view engine setup
app.listen(8085, () => {
  console.log('Server started on port 8085');
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(expressSession({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use('/', indexRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/bets', betsRouter);
app.use('/finance', financeRouter);
app.use('/live', liveRouter);
app.use('/results', resultsRouter);
app.use('/sport', sportRouter);
app.use('/statistics', statisticsRouter);
app.use('/transaction', transactionRouter);
app.use('/virtual', virtualRouter);
app.use('/dashboard',dashboardRouter);
app.use('/football',footballRouter);
app.use('/markets',marketsRouter);
app.use('/bookmark',bookmarkRouter);
app.use('/prematch',prematchRouter);
app.use('/rabbitmq',rabbitmqRouter);
app.use('/reset',resetRouter);
app.use('/today',todayRouter);
app.use('/betting',bettingRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // set status code
  res.status(err.status || 500);
  // redirect to the same page with an error query parameter
  res.redirect(req.header('Referer') + '?error=' + encodeURIComponent(err.message));
});
// var channel, connection;  //global variables
// async function connectQueue() {   
//     try {
//         connection = await amqp.connect("amqp://localhost:15672");
//         channel    = await connection.createChannel()
        
//         await channel.assertQueue("test-queue")
        
//     } catch (error) {
//         console.log(error)
//     }
// }
// connectQueue()
// async function sendData (data) {
//   // send data to queue
//   await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));
      
//   // close the channel and connection
//   await channel.close();
//   await connection.close(); 
// }
//THE RIGHT VERSION OF USERNAMES
module.exports = app;

