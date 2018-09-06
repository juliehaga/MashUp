var processRecievedData = function (requestData) {
    requestData = JSON.parse(requestData)


    let activities = [];
    for (var i=0; i < requestData["places"].length; i++){
        let activity = {"name": requestData["places"][i]["name"],
            "location": requestData["places"][i]["city"] + ", " +requestData["places"][i]["country"],
            "direction": requestData["places"][i]["directions"],
            "activity": requestData["places"][i]["activities"][0]["activity_type_name"],
            "description": requestData["places"][i]["activities"][0]["description"],
            "lat": requestData["places"][i]["lat"],
            "lng": requestData["places"][i]["lon"]
        }

        activities.push(activity);
    }
    return activities;
}

module.exports.processRecievedData = processRecievedData;