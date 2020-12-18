$(document).ready(function() {
    rellenarInputs();
    $("[name='btnAceptar']").click(modificaUsuarios);
})

function rellenarInputs() {
    $.post("php/valoresUsuario.php", $("#frmModificarUsuario").serialize(), function(datos) {
        formulario.gmail.value = datos.email;
        formulario.dni.value = datos.dni;
        formulario.nombre.value = datos.nombre;
        formulario.apellidos.value = datos.apellido;
        formulario.direccion.value = datos.direccion;
        formulario.nomUsuario.value = datos.nomUsuario;
        formulario.contraseña.value = datos.password;
    }, "json");
}

function modificaUsuarios() {
    let datos = {
        dni: $("[name='DNI']").val(),
        nombre: $("[name='nombre']").val(),
        apellidos: $("[name='apellidos']").val(),
        gmail: $("[name='gmail']").val(),
        direccion: $("[name='direccion']").val(),
        nomUsuario: $("[name='nomUsuario']").val(),
        contraseña: $("[name='contraseña']").val()
    }

    var oE = window.event;
    var bValido = true;
    var sError = "";

    //Validar Dni
        
    var oExpReg = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

    if (oExpReg.test(datos.dni) == false) {
        bValido = false;
        sError = "El DNi debe estar compues por 8 dígitos y una letra";
    }

    //Validar nombre
    
    oExpReg = /[/sa-zA-Z]{3,20}/;

    if (oExpReg.test(datos.nombre) == false) {
        if (bValido == true) {
            bValido = false;
        }   
        sError += "\n El nombre debe ser alfabetico entre 3 y 20 caracteres";
    }

    //Validar apellido
    oExpReg = /[/sa-zA-Z]{3,40}/;

    if (oExpReg.test(datos.apellidos) == false) {
        if (bValido == true) {
            bValido = false;
        }
        sError += "\n El apellido deber ser alfabetico entre 3 y 40 caracteres";
    }

    //Validar gmail
    oExpReg = /^[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}$/;

    if (oExpReg.test(datos.gmail) == false) {
        if (bValido == true) {
            bValido = false;
        }
        sError += "\n El email es incorrecto";
    }

    //Validar direccion

    oExpReg = /^[a-z\d_]{4,30}$/i;

    if (oExpReg.test(datos.nomUsuario) == false) {
        if (bValido == true) {
            bValido = false;
        }
        sError += "\n La dirección debe estar comprendida entre 4 30 caracteres";
    }

    //Validar nombre de usuario 

    oExpReg = /^[a-z\d_]{4,15}$/i;

    if (oExpReg.test(datos.nomUsuario) == false) {
        if (bValido == true) {
            bValido = false;
        }
        sError += "\n El nombre de usuario tiene que estar comprendido entre 4 y 15 caracteres";
    }

    //Validar contraseña

    oExpReg =  /(?=^.{5,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; 

    if (oExpReg.test(datos.contraseña) == false) {
        if (bValido == true) {
            bValido = false;
        }
        sError += "\n La contraseña tiene que tener como mínimo 5 caracteres un caracter especial y un número";
    }

    //Mostrar errores
    if (bValido == false) {
    alert(sError);
    oE.preventDefault();
    } else {
    actualizarUsuario();
    }

    function actualizarUsuario() {
        var formData = new FormData();
        formData.append("gmail", formulario.gmail.value.trim());
        formData.append("dni", formulario.dni.value.trim());
        formData.append("nombre", formulario.nombre.value.trim());
        formData.append("apellido", formulario.apellidos.value.trim());
        formData.append("direccion", formulario.direccion.value.trim());
        formData.append("nomUsuario", formulario.nomUsuario.value.trim());
        formData.append("password", formulario.contraseña.value.trim());

        $.ajax({
            url: "php/modUsuarios.php",
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