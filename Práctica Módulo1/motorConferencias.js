if (!localStorage.getItem("nombreIndex")) {
    location.replace("index.html");
}

//SCRIPT DONDE ESTAMOS

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

function showPosition(position) {

    //Localización de la conferencia
    var r = 100 / 111300 // = 100 meters
  , y0 = (Math.random()*22)
  , x0 = (Math.random()*92)
  , u = Math.random()
  , v = Math.random()
  , w = r * Math.sqrt(u)
  , t = 2 * Math.PI * v
  , x = w * Math.cos(t)
  , y1 = w * Math.sin(t)
  , x1 = x / Math.cos(y0);
    var newY = y0 + y1;
    var newX = x0 + x1;
    var latlonConf = newX + "," + newY;
    var imgUrlConf = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlonConf + "&zoom=6&size=400x400&sensor=false";
    document.getElementById("dondeConferencia").innerHTML = "<img src='" + imgUrlConf + "'>";
    //Localización del visitante
    var latlonTu = position.coords.latitude + "," + position.coords.longitude;
    var imgUrlTu = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlonTu + "&zoom=16&size=400x400&sensor=false";
    document.getElementById("dondeTu").innerHTML = "<img src='" + imgUrlTu + "'>";
};

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
//FIN SCRIPT DONDE ESTAMOS

//SCRIPT MAPA SALA CONFERENCIAS
function mostrarMapa() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#90C3D4";//SALA
    ctx.fillRect(5, 5, 590, 390);
    ctx.fillStyle = "#9555D4";//ATRIL
    ctx.fillRect(250, 7, 90, 50);
    ctx.fillStyle = "#1233D4";//BUTACAS SECCION 1
    ctx.fillRect(88, 100, 130, 270);
    ctx.fillStyle = "#5673D4";//BUTACAS SECCION 2
    ctx.fillRect(228, 100, 130, 270);
    ctx.fillStyle = "#890111";//BUTACAS SECCION 3
    ctx.fillRect(368, 100, 150, 270);
};
//FIN SCRIPT MAPA SALA CONFERENCIAS

//SCRIPT ELEGIR CONFERENCIAS
function elegirConferencias() {

    crearTabla();


};


function crearTabla() {
    var tablaDisp = document.createElement("table");
    tablaDisp.setAttribute("border", "1");
    for (var i = 0; i < 5; i++) {
        var fila = document.createElement("tr");
        fila.setAttribute("style", "color:red;");
        var c1 = document.createElement("td");
        var t1 = document.createTextNode("Fila " + i + " col 1");
        c1.appendChild(t1);

        var c2 = document.createElement("td");
        var t2 = document.createTextNode("Fila " + i + " col 2");
        c2.appendChild(t2);

        var c3 = document.createElement("td");
        var t3 = document.createTextNode("Fila " + i + " col 3");
        c3.appendChild(t3);
        c3.setAttribute("style", "color:verde");
        fila.appendChild(c1);
        fila.appendChild(c2);
        fila.appendChild(c3);

        tablaDisp.appendChild(fila);
    }

    document.body.appendChild(tablaDisp);

}











//FIN SCRIPT ELEGIR CONFERENCIAS

//SCRIPT REGISTRAR ASISTENTES
function registrarAsistentes() {
    
};
//FIN SCRIPT REGISTRAR ASISTENTES

$(document).ready(function() {

    $(".showSingle").click(function() {
        $(".targetDiv").hide();
        $("#div" + $(this).attr("target")).show();
    });


//    $("#btnDonde").click(getLocation);
//    $("#btnMapa").click(mostrarMapa);
//    $("#btnConferencias").click(elegirConferencias);
//    $("#btnAsistentes").click(registrarAsistentes);

});

document.getElementById("btnDonde").addEventListener("click", getLocation);
document.getElementById("btnMapa").addEventListener("click", mostrarMapa);
document.getElementById("btnConferencias").addEventListener("click", elegirConferencias);
document.getElementById("btnAsistentes").addEventListener("click", registrarAsistentes);

