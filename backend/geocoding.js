var unirest = require("unirest");
//https://developers.google.com/maps/documentation/geocoding/intro#place-id

let constructGeocodeURL = function(street, city, zip, country) {
    let query = street+"&"+city+"&"+zip+"&"+country;
    if (query instanceof Error) {
        return new Error("geocode API request url could not be constructed", query);
    }
    var geocode = {
        hostname: "https://maps.googleapis.com/maps/api/geocode/json",
        path: "?address=" + query + "&key=AIzaSyDhSugVEeZX0fAPoffFbBz19bGPhR2swmY",
    };
    return requestURL = geocode.hostname + geocode.path;
};



exports.findCoordinates = function(street, city, zip, country)  {
    return new Promise(function(resolve, reject) {

        unirest.get(constructGeocodeURL(street, city, zip, country))
            .end(function (result) {
                if (result.error) {
                    console.log("Geocoding API failed");
                    reject(result.error);
                } else {
                    resolve(result.body);
                }
            });
    })
};

