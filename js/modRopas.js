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
    loadXMLDocAsync("php/getRopas.php", rellenaSelect, "#lstRopa");
}

function rellenaSelect(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function(e) {
        $(elemento).append("<option value='" + e.id + "'>" + e.nombre + "</option>");
    });
}

function rellenarInputs() {
    $.post("php/valoresRopa.php", $("#frmModificarRopa").serialize(), function(datos) {
        formularioRopas.modNombreProducto.value = datos.nombre;
        formularioRopas.estado.value = datos.estado;
        formularioRopas.descripcion.value = datos.descripcion;
        formularioRopas.precio.value = datos.precio;
        formularioRopas.marca.value = datos.marca;
        formularioRopas.talla.value = datos.talla;
        formularioRopas.sexo.value = datos.sexo;
    }, "json");
}

function modificaProducto() {
    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioRopas.modNombreProducto.value.trim();
    var oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;

    if (oExpReg.test(nombre) == false) {
        bValido = false;
        formularioProductos.nombrRopas.focus();
        sError = "El nombre de producto debe estar comprendido entre 3 y 15 caracteres";
    }

    //Validar descripcion
    let descripcion = formularioRopas.descripcion.value.trim();
    oExpReg = /^[\s\S]{0,200}$/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            formularioRopas.descripcion.focus();
            bValido = false;
        }
        sError += "\n La descripcion debe estar comprendida entre 5 y 200 carcateres";
    }

    //Validar precio
    let precio = formularioRopas.precio.value.trim();
    oExpReg = /^[1-9]\d*(\.\d+)?$/;
    if (oExpReg.test(precio) == false) {
        if (bValido == true) {
            formularioRopas.precio.focus();
            bValido = false;
        }
        sError += "\n El precio deber ser números y el decimal separado con un punto";
    }

    //Validar marca
    let marca = formularioRopas.marca.value.trim();
    oExpReg =  /^[a-zA-Z0-9\s]{3,15}$/;
    if (oExpReg.test(marca) == false) {
        if (bValido == true) {
            formularioRopas.precio.focus();
            bValido = false;
        }
        sError += "\n La marca debe estar comprendida entre tres y 15 caracteres";
    }

    //Validar talla
    let talla = formularioRopas.talla.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{1,5}$/;
    if (oExpReg.test(talla) == false) {
        if (bValido == true) {
            formularioRopas.talla.focus();
            bValido = false;
        }
        sError += "\n La talla debe estar comprendida entre 1 y 5 caracteres";
    }

    //Mostrar errores
    if (bValido == false) {
        alert(sError);
        oE.preventDefault();
    } else {
        actualizaRopa();
    }

    function actualizaRopa() {
        var formData = new FormData();
        formData.append("id", frmModificarRopa.lstRopa.value.trim());
        formData.append("nombre", formularioRopas.modNombreProducto.value.trim());
        formData.append("estado", formularioRopas.estado.value.trim());
        formData.append("descripcion", formularioRopas.descripcion.value.trim());
        formData.append("precio", formularioRopas.precio.value.trim());
        formData.append("marca", formularioRopas.marca.value.trim());
        formData.append("talla", formularioRopas.talla.value.trim());
        formData.append("sexo", formularioRopas.sexo.value.trim());
        formData.append("imagen", formularioRopas.imagen.files[0]);

        $.ajax({
            url: "php/modRopas.php",
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