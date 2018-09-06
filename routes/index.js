var express = require('express');
var router = express.Router();
var trailAPI = require('../backend/trailAPI');
var darkskyAPI = require('../backend/darkskyAPI');
var processResults = require('../backend/processResults');

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

    trailAPI.trailAPIRequest(formData).then(function whenOk(response) {
        response = processResults.processRecievedData(JSON.stringify(response));

        let forecastLocations = response.map(function(activity) {
            let location = {"lat": activity.lat, "lng": activity.lng, "time": Math.round(Date.now()/1000) + formData.weatherDay*3600*24};
            return darkskyAPI.darkSkyAPIRequest(location);
        });

        Promise.all(forecastLocations).then(function(weatherResults){

            let i = 0;
            trailAndWeatherData = response.map(function (activity) {
                activity.weatherSummary = weatherResults[i]["daily"]["data"][0]["summary"];
                activity.temp = weatherResults[i]["daily"]["data"][0]["temperatureHigh"];
                i++;
                return activity;
            })

            //trailAndWeatherData eksisterer bare her
            if (formData.goodWeather){
                console.log("Sorter ut finvær!!!!");
                trailAndWeatherData = trailAndWeatherData.filter(function (activity) {
                    console.log(activity.weatherSummary);
                    return activity.weatherSummary.toLowerCase().includes("clear");

                })
            }
            res.render('results', {trailresult: trailAndWeatherData});

        });

        })
        .catch(function notOk(err) {
            console.error(err)
        })
});


module.exports = router;
