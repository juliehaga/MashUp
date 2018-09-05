
function customizeLocation(selector) {
    console.log("kjører location update");
    console.log(selector);
    if (selector.value === "customize") {
        document.getElementById("toogle-location").style.display = "block";
    } else {
        document.getElementById("toogle-location").style.display = "none";
    }
}


function showGoodWeatherSearch(checkbox){
    if (checkbox.value){
        console.log("Checkbox pushed");
        document.getElementById("toogle-weather").style.display = "block";
    }
}

