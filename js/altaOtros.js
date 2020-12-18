"use strict";
formularioOtros.btnAceptar.addEventListener("click", validaFormulario);

function validaFormulario() {
    //Validar
    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioOtros.nombreProducto.value.trim();
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
        enviarOtro();
    }

    function enviarOtro() {
        var formData = new FormData();
        formData.append("nombre", formularioOtros.nombreProducto.value.trim());
        formData.append("estado", formularioOtros.estado.value.trim());
        formData.append("descripcion", formularioOtros.descripcion.value.trim());
        formData.append("precio", formularioOtros.precio.value.trim());
        formData.append("imagen", formularioOtros.imagen.files[0]);

        $.ajax({
            url: "php/altaOtros.php",
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