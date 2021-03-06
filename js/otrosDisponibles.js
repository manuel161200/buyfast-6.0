$(document).ready(function () {
    $("#formularios").empty();
    $.get("php/otrosDisponibles.php", function(respuesta) {
        $("#formularios").append(creaCards(respuesta));
    }, "xml");
});

function creaCards(xml) {
    let todo = document.createElement("div");
    todo.classList.add("listados");
    let btnNegociar = document.createElement("input");
    btnNegociar.setAttribute("type", "button");
    btnNegociar.setAttribute("id", "btnNegociar");
    btnNegociar.setAttribute("value", "Negociar");
    btnNegociar.classList.add("btn");
    btnNegociar.classList.add("btn-outline-success");
    btnNegociar.classList.add("w-auto");
    btnNegociar.classList.add("mx-auto");
    let btnNegociarClonado = null;
    let contador = 0;
    xml.querySelectorAll("otro").forEach(elem => {
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.setAttribute("src", "/TFG/Codigo/imgOtros/"+elem.querySelector("imagen").textContent);
        card.append(img);
        let cuerpo = document.createElement("div");
        cuerpo.classList.add("card-body");
        let nombre = document.createElement("h5");
        nombre.classList.add("card-title");
        nombre.append(elem.querySelector("nombre"));
        cuerpo.append(nombre);
        let estado = document.createElement("h6");
        estado.classList.add("card-subtitle")
        estado.classList.add("mb-2");
        estado.classList.add("text-muted")
        estado.append(elem.querySelector("estado"));
        cuerpo.append(estado);
        let descripcion = document.createElement("p");
        descripcion.classList.add("card-text");
        descripcion.append("Descripción: ");
        descripcion.append(elem.querySelector("descripcion"));
        cuerpo.append(descripcion);
        let lista = document.createElement("ul");
        lista.classList.add("list-group");
        lista.classList.add("list-group-flush")
        let precio = document.createElement("li");
        precio.classList.add("list-group-item");
        precio.append("Precio: ");
        precio.append(elem.querySelector("precio"));
        precio.append("€");
        lista.append(precio);
        let pie = document.createElement("div");
        pie.classList.add("card-body");
        btnNegociarClonado = btnNegociar.cloneNode(true);
        btnNegociarClonado.id = btnNegociarClonado.id+contador;
        contador++;
        btnNegociarClonado.dataset.id_producto = elem.querySelector("id").textContent;
        pie.append(btnNegociarClonado);
        btnNegociarClonado.addEventListener("click",negociar,false);
        card.append(cuerpo);
        card.append(lista);
        card.append(pie);
        todo.append(card);
    });
    return todo;

}

function negociar(oEvento) {
    let oE = oEvento || window.event;
    let id = oE.currentTarget.dataset.id_producto;
    $.post("php/negociarOtro.php", ("id="+id), function(respuesta) {
        alert(respuesta.mensaje);
        if (respuesta.error == 0) {
            $("#formularios").empty();
        }
    }, "json");
}