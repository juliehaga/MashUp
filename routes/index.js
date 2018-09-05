var express = require('express');
var router = express.Router();
var geoLocation = require('../public/javascripts/getLocation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find Activities' });
});


router.get('/about', function(req, res){
    res.render('about');
});


router.get('/find-activities', function(req, res){
    res.render('find-activities');
});


router.post('/userInput', function(req, res){
    console.log("post user info");
    res.render('about');
});


module.exports = router;
