global.navigator = {
    userAgent: 'node.js'
};


function getLocationOfUSer() {
    if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                // for when getting location is a success
                console.log('latitude', position.coords.latitude,
                    'longitude', position.coords.longitude);
            },
            function error(error_message) {
                // for when getting location results in an error
                console.error('An error has occured while retrieving location', error_message)
            }
        );
    } else {
        // geolocation is not supported
        // get your location some other way
        console.log('geolocation is not enabled on this browser')
    }
}


function initMap() {
    console.log("init map");
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    updateMap();
}

function updateMap() {
    var pos = {
        lat:-34,
        lng:153
    };

    var center = new google.maps.LatLng(pos.lat, pos.lng);
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
}

