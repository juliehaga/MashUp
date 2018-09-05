var unirest = require('unirest');

//let trailApiHeaders = {"X-Mashape-Key":"JCOm6HzntkmshkTLOE6Omng73CKap1Xh0cdjsnhhOk5IdC253g", "Accept":"text/html"};

function constructTrailQuery(inputs) {
    let query = "";
    let queryParamaters = ["lat","&limit", "&lon", "&q-activities_activity_type_name_eq", "&q-city_cont", "&q-country_cont", "&radius" ]
    console.log("Input lengde: ");
    console.log(inputs.length);

    if (inputs.length <= 0) {
        return new Error("No inputs argument passed to trailAPI");
    }
    for (var i=0; i < inputs.length; i++){
        if (inputs[i] != '' && inputs[i] != null){
            query += queryParamaters[i] + '=' + inputs[i];
        }
    }
    return query;
}

var constructTrailAPIRequestURL = function (lat, limit, lon, activity_type, city, country, radius) {
    let inputs = [lat, limit, lon, activity_type, city, country, radius];
    var query = constructTrailQuery(inputs);
    console.log("query" + query);

    //check if constructQuery returned an error.
    if (query instanceof Error) {
        return new Error('Trail API request url could not be constructed', query);
    }
    let trailAPIinfo = {
        "hostname" : "https://trailapi-trailapi.p.mashape.com/",
        "path" : "?" + query,
    };
    return trailAPIinfo.hostname + trailAPIinfo.path;
}




exports.trailAPIRequest = function(inputInfo)  {
    return new Promise(function(resolve, reject) {

    // These code snippets use an open-source library. http://unirest.io/nodejs
    console.log("making a search with the following info");
    console.log(inputInfo)
    unirest.get(constructTrailAPIRequestURL(inputInfo.lat, inputInfo.limit, inputInfo.lon, inputInfo.activities, inputInfo.city, inputInfo.country, inputInfo.radius))
        .header("X-Mashape-Key", "JCOm6HzntkmshkTLOE6Omng73CKap1Xh0cdjsnhhOk5IdC253g")
        .header("Accept", "text/plain")
        .end(function (result) {
            if (result.error) {
                console.log("TrailAPI call failed")
                reject(result.error);
            } else {
                console.log("TrailAPI call okay");
                resolve(result.body);

            }

        });

   })
};





