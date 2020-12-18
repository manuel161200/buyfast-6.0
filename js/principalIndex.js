$(document).ready(function() {
    $(".registro").click(function() {
        $("#cards").hide();
        $("#carousel").hide();
        $("#formularios").show();
        if ($('#form').length == 0) {
            // $("#formularios >*:not(#form)").hide();
            $("#formularios").load("formularios/altaUsuarios.html", function() {
                $.getScript("js/altaUsuarios.js");
            });
            $("#cards").hide();
            
        } else {
            $('#form').parent().show();
            $("#cards").hide();
        }
    });

    $(".login").click(function() {
        $("#cards").hide();
        $("#carousel").hide();
        $("#formularios").show();
        if ($('#loginUsuarios').length == 0) {
            $("#formularios >*:not(#loginUsuarios)").hide();
            $("#formularios").load("formularios/login.html", function() {
                $.getScript("js/loginUsuarios.js");
            });
            $("#cards").hide();
        } else {
            $('#loginUsuarios').parent().show();
            $("#cards").hide();
        }
    });

    $(".inicio").click(function() {
        location.reload();
    });
});