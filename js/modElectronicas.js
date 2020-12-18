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
    loadXMLDocAsync("php/getElectronicas.php", rellenaSelect, "#lstElectronica");
}

function rellenaSelect(resultado, elemento) {
    let datos = JSON.parse(resultado);
    datos.forEach(function(e) {
        $(elemento).append("<option value='" + e.id + "'>" + e.nombre + "</option>");
    });
}

function rellenarInputs() {
    $.post("php/valoresElectronica.php", $("#frmModificarElectronica").serialize(), function(datos) {
        formularioElectronica.modNombreProducto.value = datos.nombre;
        formularioElectronica.estado.value = datos.estado;
        formularioElectronica.descripcion.value = datos.descripcion;
        formularioElectronica.precio.value = datos.precio;
        formularioElectronica.modelo.value = datos.modelo;
        formularioElectronica.tipo.value = datos.tipo;
    }, "json");
}

function modificaProducto() {
    //Validar
    var oE = window.event;
    var bValido = true;
    var sError = "";

    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioElectronica.modNombreProducto.value.trim();
    var oExpReg = /^[a-zA-Z0-9\s]{2,15}$/;

    if (oExpReg.test(nombre) == false) {
        bValido = false;
        formularioElectronica.nombreProducto.focus();
        sError = "El nombre de producto debe estar comprendido entre 2 y 15 caracteres";
    }

    //Validar descripcion
    let descripcion = formularioElectronica.descripcion.value.trim();
    oExpReg = /^[\s\S]{0,200}$/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            formularioElectronica.descripcion.focus();
            bValido = false;
        }
        sError += "\n La descripcion debe estar comprendida entre 1 y 200 carcateres";
    }

    //Validar precio
    let precio = formularioElectronica.precio.value.trim();
    oExpReg = /^[1-9]\d*(\.\d+)?$/;
    if (oExpReg.test(precio) == false) {
        if (bValido == true) {
            formularioElectronica.precio.focus();
            bValido = false;
        }
        sError += "\n El precio deber ser números y el decimal separado con un punto";
    }

    //Validar modelo
    let modelo = formularioElectronica.modelo.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{2,15}$/;
    if (oExpReg.test(modelo) == false) {
        if (bValido == true) {
            formularioElectronica.modelo.focus();
            bValido = false;
        }
        sError += "\n El modelo debe ser entre 2 y 15 caracteres";
    }

    //Validar tipo
    let tipo = formularioElectronica.tipo.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{2,15}$/;
    if (oExpReg.test(tipo) == false) {
        if (bValido == true) {
            formularioElectronica.tipo.focus();
            bValido = false;
        }
        sError += "\n El tipo debe estar comprendido entre 2 y 15 caracteres";
    }

    //Mostrar errores
    if (bValido == false) {
        alert(sError);
        oE.preventDefault();
    } else {
        modificarElectronica();
    }

    function modificarElectronica() {
        var formData = new FormData();
        formData.append("id", frmModificarElectronica.lstElectronica.value.trim());
        formData.append("nombre", formularioElectronica.modNombreProducto.value.trim());
        formData.append("estado", formularioElectronica.estado.value.trim());
        formData.append("descripcion", formularioElectronica.descripcion.value.trim());
        formData.append("precio", formularioElectronica.precio.value.trim());
        formData.append("modelo", formularioElectronica.modelo.value.trim());
        formData.append("tipo", formularioElectronica.tipo.value.trim());
        formData.append("imagen", formularioElectronica.imagen.files[0]);

        $.ajax({
            url: "php/modElectronicas.php",
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