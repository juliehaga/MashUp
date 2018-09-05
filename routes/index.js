var express = require('express');
var router = express.Router();
var trailAPI = require('../backend/trailAPI');

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


router.post('/user-input', function(req, res){
    let formData = req.body;
    console.log("--------------FORMDATA--------------");
    console.log(formData);


    let inputInfo = {
        "lat" : "",
        "limit" : formData.noResults,
        "lon": "",
        "activities": formData.activityType,
        "city": formData.city,
        "country": formData.country,
        "radius": formData.radius,
    };
    //JSON.stringify




    trailAPI.trailAPIRequest(inputInfo).then(function whenOk(response) {
        response = JSON.stringify(response)
        res.render('results', {trailresult: response });
        })
        .catch(function notOk(err) {
            console.error(err)
        })


});


module.exports = router;
