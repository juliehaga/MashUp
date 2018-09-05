
function locationUpdate(selector) {
    console.log("kjører location update");
    if (selector.value === "manual")  {
        document.getElementById("auto-wrapper").style.display = "none";
    } else {
        document.getElementById("auto-wrapper").style.display = "block";
    }
}

