var tablasCreadas = undefined;

var url = "https://alumnoscurso.azure-mobile.net/Tables/PracticaHMTL5_09/";
var modificando = undefined;

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
    ctx.fillRect(368, 100, 130, 270);
};
//FIN SCRIPT MAPA SALA CONFERENCIAS

//SCRIPT ELEGIR CONFERENCIAS
function elegirConferencias() {
    if (!tablasCreadas) {
        crearTabla();
    }
//    $(function () {
//        $("#sortable1, #sortable2").sortable({
//            connectWith: ".connectedSortable"
//        }).disableSelection();
//    });
};


function crearTabla() {
    //Lista conferencias disponibles.
    //var tituloDisp = document.createElement("h3");
    //var tituloDispTxt = document.createTextNode("Conferencias Disponibles");
    //tituloDisp.appendChild(tituloDispTxt);
    //document.getElementById("tituloDisponibles").appendChild(tituloDisp);


    var listaDisp = document.createElement("ul");
    //listaDisp.setAttribute("id", "sortable1");
    //listaDisp.setAttribute("class", "connectedSortable");
    listaDisp.setAttribute("id", "listaDisp");
    listaDisp.setAttribute("ondrop", "drop(event)");
    listaDisp.setAttribute("ondragover", "allowDrop(event)");
    
    for (var i = 0; i < 7; i++) {
        var itemLista = document.createElement("li");
        itemLista.setAttribute("draggable", "true");
        itemLista.setAttribute("ondragstart", "drag(event)");
        itemLista.setAttribute("id", i);
        var itemListaTxt = document.createTextNode("Conferencia " + i);
        itemLista.appendChild(itemListaTxt);
        listaDisp.appendChild(itemLista);
    }
    document.getElementById("tablaDisponibles").appendChild(listaDisp);

    //Lista conferencias elegidas.
    var listaSelec = document.createElement("ul");
    //listaSelec.setAttribute("id", "sortable2");
    //listaSelec.setAttribute("class", "connectedSortable");
    listaSelec.setAttribute("id", "listaSelec");
    listaSelec.setAttribute("ondrop", "drop(event)");
    listaSelec.setAttribute("ondragover", "allowDrop(event)");
    document.getElementById("tablaElegidas").appendChild(listaSelec);

    tablasCreadas = true;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    //var listaDestino = ev.target.id;
    var listaDestino = ev.target.id;
    if (ev.target.localName != "ul") {
        listaDestino = document.getElementById(ev.target.id).parentElement.id;
    }
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));

    document.getElementById(listaDestino)
        .appendChild(document.getElementById(data));
    var listaParaOrdenar = "#" + listaDestino + " li";

    $(listaParaOrdenar).sort(function (a, b) {
        return parseInt(a.id) - parseInt(b.id);
    }).each(function () {
        var elem = $(this);
        elem.remove();
        $(elem).appendTo("#"+listaDestino);
    });


}

//FIN SCRIPT ELEGIR CONFERENCIAS

//SCRIPT REGISTRAR ASISTENTES
function obtenerObjeto() {
    var objeto = {
        nombre: document.getElementById("txtNombre").value,
        apellidos: document.getElementById("txtApellidos").value,
        cargo: document.getElementById("txtCargo").value
    };

    return objeto;
};
function crearTablaAsist(data) {

    var salida = "<table>";

    salida += "<tr>";
    salida += "<th>" + "Nombre" + "</th>";
    salida += "<th>" + "Apellidos" + "</th>";
    salida += "<th>" + "Cargo en la empresa" + "</th>" + "</tr>";

    for (var i = 0; i < data.length; i++) {
        salida += "<tr>";
        salida += "<td>" + data[i].nombre + "</td>";
        salida += "<td>" + data[i].apellidos + "</td>";
        salida += "<td>" + data[i].cargo + "</td>";
        salida += "<td><button type='button' onclick='borrar(\"" + data[i].id +"\")'>Borrar</button></td>";   
        salida += "<td><button type='button' onclick='cargarModificacion(\"" + data[i].id + "\")'>Modificar</button></td>";
        salida += "</tr>";


    }
    salida += "</table>";

    //Se inserta la tabla creada en la capa del html
    document.getElementById("tablaAsist").innerHTML = salida;
};

function borrar(id) {
    var ajax = new XMLHttpRequest();
    ajax.open("delete", url + "/" + id);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status >= 200 && ajax.status < 300) {
                actualizar();
            }
            else {
                alert("Error!!!!");
            }
        }
    }
    ajax.send(null);
}

function cargarModificacion(id) {
    var ajax = new XMLHttpRequest();
    ajax.open("get", url + "/" + id);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status >= 200 && ajax.status < 300) {
                var data = JSON.parse(ajax.responseText);
                document.getElementById("txtNombre").value = data.nombre;
                document.getElementById("txtApellidos").value = data.apellidos;
                document.getElementById("txtCargo").value = data.cargo;
                modificando = data.id;
            }
            else {
                alert("Error!!!!");
            }
        }
    }
    ajax.send(null);
}

function ejecutarModificacion() {
    var ajax = new XMLHttpRequest();
    ajax.open("PATCH", url + "/" + modificando);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status >= 200 && ajax.status < 300) {
                actualizar();
            }
            else {
                alert("Error!!!!");
            }
        }
    }
    var data = obtenerObjeto();
    data.id = modificando;
    ajax.send(JSON.stringify(data));

    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidos").value = "";
    document.getElementById("txtCargo").value = "";
}

function actualizar() {
    modificando = undefined;
    var ajax = new XMLHttpRequest();
    ajax.open("get", url);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status >= 200 && ajax.status < 300) {
                var data = JSON.parse(ajax.responseText);
                crearTablaAsist(data);
            }
            else {
                alert("Error!!!!");
            }
        }
    }
    ajax.send(null);
}

function insertar() {
    var ajax = new XMLHttpRequest();
    ajax.open("post", url);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status >= 200 && ajax.status < 300) {
                actualizar();
            }
            else {
                alert("Error!!!!");
            }
        }
    }
    ajax.send(JSON.stringify(obtenerObjeto()));
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidos").value = "";
    document.getElementById("txtCargo").value = "";
}

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
document.getElementById("btnAsistentes").addEventListener("click", actualizar);

document.getElementById("btnAct").addEventListener("click", actualizar);
document.getElementById("btnGuardar").addEventListener("click",function () {
    if (modificando != undefined)
        ejecutarModificacion();
    else
        insertar();
});