
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    let infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //må kunne sende denne posisjonen videre.
            document.getElementById('lat').value = pos.lat;
            console.log(pos.lng);
            document.getElementById('lng').value = pos.lng;

            infoWindow.setPosition(pos);
            infoWindow.setContent('Current location');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


function drawActivitiesOnMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
    });
    let infoWindow = new google.maps.InfoWindow;

    var pos = {
        lat: locationData[0].lat,
        lng: locationData[0].lng
    };

    map.setCenter(pos);

    for (i = 0; i < locationData.length; i++) {
        let myLatLng = {lat: locationData[i].lat, lng: locationData[i].lng};
        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: locationData[i].name
        });

    }
}
