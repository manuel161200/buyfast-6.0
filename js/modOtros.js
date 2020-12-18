$(document).ready(function() {
    rellenaListas();
    $("[name='btnActualizar']").click(rellenarInputs);
    $("[name='btnAceptar']").click(modificaProducto);
});

function loadXMLDocAsync(filename, callback, p) {
    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.addEventListener("readystatechange", () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callback(xhttp.responseText, p);
        }
    });
    xhttp.open("GET", filename, true);
    xhttp.send();
}

function rellenaListas() {
    loadXMLDocAsync("php/getOtros.php", rellenaSelect, "#lstOtro");
}

function rellenaSelect(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function(e) {
        $(elemento).append("<option value='" + e.id + "'>" + e.nombre + "</option>");
    });
}

function rellenarInputs() {
    $.post("php/valoresOtro.php", $("#frmModificarOtro").serialize(), function(datos) {
        formularioOtros.modNombreProducto.value = datos.nombre;
        formularioOtros.estado.value = datos.estado;
        formularioOtros.descripcion.value = datos.descripcion;
        formularioOtros.precio.value = datos.precio;
    }, "json");
}

function modificaProducto() {
    //Validar
    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioOtros.modNombreProducto.value.trim();
    var oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;

    if (oExpReg.test(nombre) == false) {
        bValido = false;
        formularioOtros.nombreProducto.focus();
        sError = "El nombre de producto debe estar comprendido entre 3 y 15 caracteres";
    }

    //Validar descripcion
    let descripcion = formularioOtros.descripcion.value.trim();
    oExpReg = /^[\s\S]{0,200}$/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            formularioOtros.descripcion.focus();
            bValido = false;
        }
        sError += "\n La descripcion debe estar comprendida entre 5 y 200 carcateres";
    }

    //Validar precio
    let precio = formularioOtros.precio.value.trim();
    oExpReg = /^[1-9]\d*(\.\d+)?$/;
    if (oExpReg.test(precio) == false) {
        if (bValido == true) {
            formularioOtros.precio.focus();
            bValido = false;
        }
        sError += "\n El precio deber ser números y el decimal separado con un punto";
    }

    if (bValido == false) {
        alert(sError);
        oE.preventDefault();
    } else {
        modificarOtro();
    }

    function modificarOtro() {
        var formData = new FormData;
        formData.append("id", frmModificarOtro.lstOtro.value.trim());
        formData.append("nombre", formularioOtros.modNombreProducto.value.trim());
        formData.append("estado", formularioOtros.estado.value.trim());
        formData.append("descripcion", formularioOtros.descripcion.value.trim());
        formData.append("precio", formularioOtros.precio.value.trim());
        formData.append("imagen", formularioOtros.imagen.files[0]);

        $.ajax({
            url: "php/modOtros.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json"
        }).done((json) => {
            alert(json.mensaje);
            if (json.error == 0) {
                location.reload();
            }
        });
    }
}