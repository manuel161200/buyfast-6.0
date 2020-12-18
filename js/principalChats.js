$(document).ready(function() {
    $("#lista").empty()
    $.get("php/misChats.php", function(respuesta) {
        $("#lista").append(creaLista(respuesta));
    }, "xml");
});

function creaLista(xml) {
    let contenido = document.createElement("div");
    contenido.classList.add("contenido");
    let a = document.createElement("a");
    a.classList.add("list-group-item");
    a.classList.add("list-group-item-action");
    a.classList.add("flex-column");
    a.classList.add("align-items-start");
    a.setAttribute("id", "chat");
    let aClonado = null;
    let contador = 0;
    xml.querySelectorAll("compra").forEach(elem => {
        aClonado = a.cloneNode(true);
        aClonado.id = aClonado.id+contador;
        contador++;
        aClonado.dataset.id_chat = elem.querySelector("chat").textContent;
        aClonado.addEventListener("click", cambiarChat,false);
        let div = document.createElement("div");
        div.classList.add("d-flex");
        div.classList.add("w-100");
        div.classList.add("justify-content-between");
        let h5 = document.createElement("h5");
        h5.classList.add("mb-1");
        h5.append(elem.querySelector("nombreUsuario"));
        div.append(h5);
        aClonado.append(div);
        contenido.append(aClonado);
    });
    
    return contenido;
}

function cambiarChat(oEvento) {
    let oE = oEvento || window.event;
    let id = oE.currentTarget.dataset.id_chat

    $("#chat_id").val(id);
    $("#btnEnviar").click(enviarMensaje);

    mostrarChat();
}

function mostrarChat() {
    
}

function enviarMensaje() {
    formData = new FormData;
    formData.append("contenido", frmChat.mensaje.value.trim());
    formData.append("chat_id" , frmChat.chat_id.value.trim());

    $.ajax({
        url: "php/enviarMensaje.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json"
    });
}