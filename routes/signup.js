let express = require('express');
let router = express.Router();
let db=require('../database');
router.get('/signup', function(req, res, next) {
    res.render('signup');
 
});
router.post('/signup', function(req, res, next) {
    const userDetails=req.body;
    let sql = "INSERT INTO bet.account SET ?";
    db.query(sql ,userDetails, function(err,data){
        if (err) throw err
    })
    res.send('<script>alert("You have been registered  successfully"); window.location.href = "/login/login";</script>');
    });
module.exports = router;
