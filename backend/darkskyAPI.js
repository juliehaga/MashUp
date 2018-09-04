let latitude= "-27.47";
let longitude = "153";

var unirest = require("unirest");



function construckDarkskyQuery(location){
    let query = '';

    if (location.hasOwnProperty("lat") && location.hasOwnProperty("lon") && location.hasOwnProperty("time")) {
        query += location.lat + "," + location.lon + "," + location.time;
    } else {
        return new Error("Invalid location");
    }
    return query;
}


let constructDarkSkyRequestURL = function(location) {

    let query = construckDarkskyQuery(location);

    if (query instanceof Error) {
        return new Error("DarkSky API request url could not be constructed", query);
    }

    var darkSkyInfo = {
        hostname: "https://api.darksky.net/forecast",
        path: "/" + query + "?units=si",
        key: "/de7693fc25d3866e0c1fdc093bb77184"
    };

    var requestURL = darkSkyInfo.hostname + darkSkyInfo.key + darkSkyInfo.path;

    return requestURL;

};

let location = {
    "lat" : latitude,
    "lon": longitude,
    "time": Math.round(Date.now()/1000)
}


unirest.get(constructDarkSkyRequestURL(location))
    .end(function (result) {
        console.log(result.status, result.headers, result.body);
        //console.log(result.body.daily);
    });

