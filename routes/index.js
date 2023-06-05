let express = require('express');
let router = express.Router();
let db=require('../database');
router.get('/', function(req, res, next) {
    res.render('index');
 
});
router.post('/', function(req, res, next) {

  res.redirect('/'); 
});
module.exports = router;
