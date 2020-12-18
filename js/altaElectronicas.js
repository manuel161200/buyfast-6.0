"use strict";
formularioElectronicas.btnAceptar.addEventListener("click", validaFormulario);

function validaFormulario() {
    //Validar
    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar nombre producto
    let nombre = formularioElectronicas.nombreProducto.value.trim();
    var oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;

    if (oExpReg.test(nombre) == false) {
        bValido = false;
        formularioElectronicas.nombreProducto.focus();
        sError = "El nombre de producto debe estar comprendido entre 3 y 15 caracteres";
    }

    //Validar descripcion
    let descripcion = formularioElectronicas.descripcion.value.trim();
    oExpReg = /^[\s\S]{0,200}$/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            formularioElectronicas.descripcion.focus();
            bValido = false;
        }
        sError += "\n La descripcion debe estar comprendida entre 1 y 200 carcateres";
    }

    //Validar precio
    let precio = formularioElectronicas.precio.value.trim();
    oExpReg = /^[1-9]\d*(\.\d+)?$/;
    if (oExpReg.test(precio) == false) {
        if (bValido == true) {
            formularioProductos.precio.focus();
            bValido = false;
        }
        sError += "\n El precio deber ser números y el decimal separado con un punto";
    }

    //Validar modelo
    let modelo = formularioElectronicas.modelo.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;
    if (oExpReg.test(modelo) == false) {
        if (bValido == true) {
            formularioElectronicas.modelo.focus();
            bValido = false;
        }
        sError += "\n El modelo debe ser entre 3 y 15 caracteres";
    }

    //Validar tipo
    let tipo = formularioElectronicas.tipo.value.trim();
    oExpReg = /^[a-zA-Z0-9\s]{3,15}$/;
    if (oExpReg.test(tipo) == false) {
        if (bValido == true) {
            formularioElectronicas.tipo.focus();
            bValido = false;
        }
        sError += "\n El tipo debe estar comprendido entre 3 y 15 caracteres";
    }

    //Mostrar errores
    if (bValido == false) {
        alert(sError);
        oE.preventDefault();
    } else {
        enviarElectronica();
    }

    function enviarElectronica() {
        var formData = new FormData();
        formData.append("nombre", formularioElectronicas.nombreProducto.value.trim());
        formData.append("estado", formularioElectronicas.estado.value.trim());
        formData.append("descripcion", formularioElectronicas.descripcion.value.trim());
        formData.append("precio", formularioElectronicas.precio.value.trim());
        formData.append("modelo", formularioElectronicas.modelo.value.trim());
        formData.append("tipo", formularioElectronicas.tipo.value.trim());
        formData.append("imagen", formularioElectronicas.imagen.files[0]);

        $.ajax({
            url: "php/altaElectronicas.php",
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