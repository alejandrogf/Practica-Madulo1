document.getElementById("btnAccederIndex").addEventListener("click", login);

//if (localStorage.getItem("nombreIndex")) {
//    location.replace("conferencias.html");
//}

function login() {
    if (document.getElementById("txtNombreIndex").value == "") {
        alert("Nombre vacio");
        $("#txtNombreIndex").val("");
        return;
    }
    localStorage.setItem("nombreIndex", $("#txtNombreIndex").val());
    location.replace("conferencias.html");
};

$(document).ready(function () {
    greet();
});

function greet() {
    var name = localStorage.getItem("nombreIndex");
    if (name == null || name == "null") {
        $("#txtNombreLabelIndex").html("Hola, desconocido, ¿Cuál es tu nombre?");
    } else {
        $("#txtNombreLabelIndex").html("Hola amigo!");
        $("#txtNombreIndex").val(name);
    }
}