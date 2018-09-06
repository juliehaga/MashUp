var unirest = require('unirest');

//let trailApiHeaders = {"X-Mashape-Key":"JCOm6HzntkmshkTLOE6Omng73CKap1Xh0cdjsnhhOk5IdC253g", "Accept":"text/html"};

function constructTrailQuery(inputs) {
    let query = "";
    let queryParamaters = ["lat","&limit", "&lon", "&q-activities_activity_type_name_eq", "&q-city_cont", "&q-country_cont", "&radius" ]
    for (var i=0; i < inputs.length; i++){
        if (inputs[i] != '' && inputs[i] != null){
            query += queryParamaters[i] + '=' + inputs[i];
        }
    }
    return query;
}

var constructTrailAPIRequestURL = function (requestData) {

    let inputs = [requestData.lat, requestData.limit, requestData.lng, requestData.activityType, requestData.city, requestData.country, requestData.radius];
    var query = constructTrailQuery(inputs);

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




exports.trailAPIRequest = function(requestData)  {
    return new Promise(function(resolve, reject) {

    // These code snippets use an open-source library. http://unirest.io/nodejs

    unirest.get(constructTrailAPIRequestURL(requestData))
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





