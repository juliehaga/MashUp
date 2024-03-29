var unirest = require("unirest");


let constructGeocodeURL = function(parameterlist) {
    let query = "";
    firstParameter = true;
    for (var i=0; i < parameterlist.length; i++){
        if (parameterlist[i] !== "")  {
            if (firstParameter === false)  {
                query += "&"
            }
            let str = parameterlist[i];
            str = str.replace(/\s+/g, '-').toLowerCase();
            query += parameterlist[i];
            firstParameter = false;
        }
    }
    console.log(query);
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
        parameterList = [street, city, zip, country];
        unirest.get(constructGeocodeURL(parameterList))
            .end(function (result) {
                if (result.error) {
                    console.log("Geocoding API failed");
                    reject(result.error);
                } else {
                    resolve(result.body);
                }
            });
    })
}
