let latitude= "-27.47";
let longitude = "153";

var unirest = require("unirest");



function construckDarkskyQuery(location){
    let query = '';
    if (location.hasOwnProperty("lat") && location.hasOwnProperty("lng") && location.hasOwnProperty("time")) {
        query += location.lat + "," + location.lng + "," + location.time;
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






exports.darkSkyAPIRequest = function(location)  {
    return new Promise(function(resolve, reject) {

        // These code snippets use an open-source library. http://unirest.io/nodejs

        unirest.get(constructDarkSkyRequestURL(location))
            .end(function (result) {
                if (result.error) {
                    console.log("darkSkyAPI call failed")
                    reject(result.error);
                } else {
                    resolve(result.body);
                }
            });
    })
};



