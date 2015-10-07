//SCRIPT DONDE ESTAMOS
var x = document.getElementById("dondeEstamos");
src = "http://maps.google.com/maps/api/js?sensor=false";
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    //Localización de la conferencia
    var r = 100 / 111300 // = 100 meters
  , y0 = (Math.random()*9)
  , x0 = (Math.random()*9)
  , u = Math.random()
  , v = Math.random()
  , w = r * Math.sqrt(u)
  , t = 2 * Math.PI * v
  , x = w * Math.cos(t)
  , y1 = w * Math.sin(t)
  , x1 = x / Math.cos(y0);
    newY = y0 + y1;
    newX = x0 + x1;
    var latlon = newX + "," + newY;
    var imgUrl = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=6&size=400x400&sensor=false";
    document.getElementById("dondeConferencia").innerHTML = "<img src='" + imgUrl + "'>";
    //Localización del visitante
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var imgUrl = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x400&sensor=false";
    document.getElementById("dondeTu").innerHTML = "<img src='" + imgUrl + "'>";
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
};

document.getElementById("btnDonde").addEventListener("click", getLocation());

//FIN SCRIPT DONDE ESTAMOS
