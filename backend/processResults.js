var processTrailData = function (requestData) {
    requestData = JSON.parse(requestData);


    let activities = [];
    for (var i=0; i < requestData["places"].length; i++){


        try {
            let activity = {"name": requestData["places"][i]["name"],
                "location": requestData["places"][i]["city"] + ", " +requestData["places"][i]["country"],
                "direction": requestData["places"][i]["directions"],
                "activity": requestData["places"][i]["activities"][0]["activity_type_name"],
                "description": requestData["places"][i]["activities"][0]["description"],
                "lat": requestData["places"][i]["lat"],
                "lng": requestData["places"][i]["lon"],
            }
            activities.push(activity);
        }catch(error) {
            console.error("Invalid data from API");
            // expected output: SyntaxError: unterminated string literal
            // Note - error messages will vary depending on browser
        }




    }
    return activities;
}

module.exports.processTrailData = processTrailData;