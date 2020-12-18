$(document).ready(function () {
    // Vehiculos
    $(".altaVehiculo").click(function() {
        $("#compras").hide();
        if ($('#altaVehiculos').length == 0) {
            // $("#formularios >*:not(#form)").hide();
            $("#formularios").load("formularios/altaVehiculos.html", function() {
                $.getScript("js/altaVehiculos.js");
                $("#altaVehiculos").show();
            });
        } else {
            $('#altaVehiculos').parent().show();
        }
    });

    $(".modificarVehiculos").click(function() {
        $("#compras").hide()
        if ($("#divfrmModificarVehiculo").length == 0) {
            $("#formularios").load("formularios/modVehiculos.html", function() {
                $.getScript("js/modVehiculos.js");
            })
        } else {
            $("#divfrmModificarVehiculo").parent().show();
        }
    });

    $(".eliminarVehiculos").click(function() {
        $("#compras").hide()
        if ($('#divfrmEliminarVehiculo').length == 0) {
            $("#formularios").load("formularios/eliminarVehiculos.html", function() {
                $.getScript("js/eliminarVehiculos.js");
            });
        } else {
            $('#divfrmEliminarVehiculo').show();
        }
    });

    $(".listaVehiculos").click(function() {
        $("#compras").hide()
        $.getScript("js/misVehiculos.js");
    });

    $("#compraVehiculos").click(function() {
        $("#compras").hide();
        $.getScript("js/vehiculosDisponibles.js");
    });

    //Ropas
    $(".altaRopa").click(function() {
        $("#compras").hide();
        if ($('#altaRopas').length == 0) {
            // $("#formularios >*:not(#form)").hide();
            $("#formularios").load("formularios/altaRopas.html", function() {
                $.getScript("js/altaRopas.js");
                $("#altaRopas").show();
            });
        } else {
            $('#altaRopas').parent().show();
        }
    });

    $(".modificarRopas").click(function() {
        $("#compras").hide()
        if ($("#divfrmModificarRopa").length == 0) {
            $("#formularios").load("formularios/modRopas.html", function() {
                $.getScript("js/modRopas.js");
            })
        } else {
            $("#divfrmModificarRopa").parent().show();
        }
    });

    $(".eliminarRopas").click(function() {
        $("#compras").hide()
        if ($('#divfrmEliminarRopa').length == 0) {
            $("#formularios").load("formularios/eliminarRopas.html", function() {
                $.getScript("js/eliminarRopas.js");
            });
        } else {
            $('#divfrmEliminarRopa').show();
        }
    });

    $(".listaRopas").click(function() {
        $("#compras").hide()
        $.getScript("js/misRopas.js");
    });

    $("#compraRopas").click(function() {
        $("#compras").hide();
        $.getScript("js/ropasDisponibles.js");
    });


    $("#inicio").click(function() {
        $("#formularios").hide();
        $("#compras").show();
    })

    //Electronicas
    $(".altaElectronica").click(function() {
        $("#compras").hide();
        if ($('#altaElectronicas').length == 0) {
            // $("#formularios >*:not(#form)").hide();
            $("#formularios").load("formularios/altaElectronicas.html", function() {
                $.getScript("js/altaElectronicas.js");
                $("#altaElectronicas").show();
            });
        } else {
            $('#altaElectronicas').parent().show();
        }
    });

    $(".modificarElectronicas").click(function() {
        $("#compras").hide()
        if ($("#divfrmModificarElectronica").length == 0) {
            $("#formularios").load("formularios/modElectronicas.html", function() {
                $.getScript("js/modElectronicas.js");
            })
        } else {
            $("#divfrmModificarElectronica").parent().show();
        }
    });

    $(".eliminarElectronicas").click(function() {
        $("#compras").hide()
        if ($('#divfrmEliminarElectronica').length == 0) {
            $("#formularios").load("formularios/eliminarElectronicas.html", function() {
                $.getScript("js/eliminarElectronicas.js");
            });
        } else {
            $('#divfrmEliminarVehiculo').show();
        }
    });
    $(".listaElectronicas").click(function() {
        $("#compras").hide()
        $.getScript("js/misElectronicas.js");
    });

    $("#compraElectronicas").click(function() {
        $("#compras").hide();
        $.getScript("js/electronicasDisponibles.js");
    });

    //Otros
    $(".altaOtros").click(function() {
        $("#compras").hide();
        if ($('#altaOtros').length == 0) {
            // $("#formularios >*:not(#form)").hide();
            $("#formularios").load("formularios/altaOtros.html", function() {
                $.getScript("js/altaOtros.js");
                $("#altaOtros").show();
            });
        } else {
            $('#altaOtros').parent().show();
        }
    });

    $(".modificarOtros").click(function() {
        $("#compras").hide()
        if ($("#divfrmModificarOtro").length == 0) {
            $("#formularios").load("formularios/modOtros.html", function() {
                $.getScript("js/modOtros.js");
            })
        } else {
            $("#divfrmModificarOtro").parent().show();
        }
    });


    $(".eliminarOtros").click(function() {
        $("#compras").hide()
        if ($('#divfrmEliminarOtro').length == 0) {
            $("#formularios").load("formularios/eliminarOtros.html", function() {
                $.getScript("js/eliminarOtros.js");
            });
        } else {
            $('#divfrmEliminarOtro').show();
        }
    });

    $(".listaOtros").click(function() {
        $("#compras").hide()
        $.getScript("js/misOtros.js");
    });

    $("#compraOtros").click(function() {
        $("#compras").hide();
        $.getScript("js/otrosDisponibles.js");
    });

    //Inicio
    $(".inicio").click(function() {
        location.reload();
    });

    //Editar usuario
    $(".modificarUsuarios").click(function() {
        $("#compras").hide()
        if ($("#divfrmModificarUsuario").length == 0) {
            $("#formularios").load("formularios/modUsuarios.html", function() {
                $.getScript("js/modUsuarios.js");
            })
        } else {
            $("#divfrmModificarUsuario").parent().show();
        }
    });
});