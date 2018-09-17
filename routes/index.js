var express = require('express');
var router = express.Router();
var trailAPI = require('../APIrequests/trailAPI');
var darkskyAPI = require('../APIrequests/darkskyAPI');
var geocoding = require('../APIrequests/geocoding');

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
    if (formData.locationOption === "customize"){
        geocoding.findCoordinates(formData.street, formData.suburb, formData.zip, formData.country).then(function whenOK(coordinates) {
            console.log("********************Finner koordinater*******************");
            console.log(coordinates["results"][0]["geometry"]["location"]["lat"]);
            console.log(coordinates["results"][0]["geometry"]["location"]["lng"]);
            formData.lat = coordinates["results"][0]["geometry"]["location"]["lat"];
            formData.lng = coordinates["results"][0]["geometry"]["location"]["lng"];

            console.log(formData)

            trailAPI.trailAPIRequest(formData).then(function whenOk(response) {
                response = trailAPI.processTrailData(JSON.stringify(response));

                response = response.filter(function (activity) {
                    return activity.activity.trim().toLowerCase().replace(/\s+/g, '') === formData.activityType;

                })

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


                    res.render('results', {trailresult: trailAndWeatherData, formData: formData, locationData: JSON.stringify(trailAndWeatherData)});

                });

            })
            .catch(function notOk(err) {
                console.error(err)
            })

        }).catch(function notOK(err) {
            console.log(err)
        });
    }
    else{
        console.log(formData)

        trailAPI.trailAPIRequest(formData).then(function whenOk(response) {
            console.log("--------------Trail API call--------------")
            response = trailAPI.processTrailData(JSON.stringify(response));

            response = response.filter(function (activity) {
                return activity.activity.trim().toLowerCase().replace(/\s+/g, '') === formData.activityType;

            })

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


                res.render('results', {trailresult: trailAndWeatherData, formData: formData, locationData: JSON.stringify(trailAndWeatherData)});

            });

            })
            .catch(function notOk(err) {
                console.error(err)
            })
    }
});


router.get('/user-input', function(req, res){
    res.render('find-activities');
});


module.exports = router;
