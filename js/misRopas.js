$(document).ready(function() {
    $("#formularios").empty();
    $.get("php/misRopas.php", function(respuesta) {
        $("#formularios").append(creaCards(respuesta));
    }, "xml");
});

function creaCards(xml) {
    let todo = document.createElement("div");
    let btnVendido = document.createElement("input");
    btnVendido.setAttribute("type", "button");
    btnVendido.setAttribute("id", "btnVendido");
    btnVendido.setAttribute("value", "Vendido");
    btnVendido.classList.add("btn");
    btnVendido.classList.add("btn-outline-success");
    btnVendido.classList.add("w-auto");
    btnVendido.classList.add("mx-auto");
    let btnVendidoClonado = null;
    let contadorVendido = 0;
    let btnDisponible = document.createElement("input");
    btnDisponible.setAttribute("type", "button");
    btnDisponible.setAttribute("id", "btnDisponible");
    btnDisponible.setAttribute("value", "Disponible");
    btnDisponible.classList.add("btn");
    btnDisponible.classList.add("btn-outline-success");
    btnDisponible.classList.add("w-auto");
    btnDisponible.classList.add("mx-auto");
    let btnDisponibleClonado = null;
    let contadorDisponible = 0;
    todo.classList.add("listados");
    xml.querySelectorAll("ropa").forEach(elem => {
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.setAttribute("src", "/TFG/Codigo/imgRopas/"+elem.querySelector("imagen").textContent);
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
        let modelo = document.createElement("li");
        modelo.classList.add("list-group-item");
        modelo.append("Marca: ");
        modelo.append(elem.querySelector("marca"));
        lista.append(modelo);
        let color = document.createElement("li");
        color.classList.add("list-group-item");
        color.append("Talla: ");
        color.append(elem.querySelector("talla"));
        lista.append(color);
        let kms = document.createElement("li");
        kms.classList.add("list-group-item");
        kms.append("Sexo: ");
        kms.append(elem.querySelector("sexo"));
        lista.append(kms);
        let precio = document.createElement("li");
        precio.classList.add("list-group-item");
        precio.append("Precio: ");
        precio.append(elem.querySelector("precio"));
        precio.append("€");
        lista.append(precio);
        let estadoCompra = document.createElement("li");
        estadoCompra.classList.add("list-group-item");
        estadoCompra.append("Estado producto: ");
        estadoCompra.append(elem.querySelector("estadoCompra"));
        lista.append(estadoCompra);
        let pie = document.createElement("div");
        pie.classList.add("card-body");
        let botones = document.createElement("div");
        botones.classList.add("btn-group");
        btnVendidoClonado = btnVendido.cloneNode(true);
        btnVendidoClonado.id = btnVendidoClonado.id+contadorVendido;
        contadorVendido++;
        btnVendidoClonado.dataset.id_producto = elem.querySelector("id").textContent;
        botones.append(btnVendidoClonado);
        btnVendidoClonado.addEventListener("click", vendido,false);
        btnDisponibleClonado = btnDisponible.cloneNode(true);
        btnDisponibleClonado.id = btnDisponibleClonado.id+contadorDisponible;
        contadorDisponible++;
        btnDisponibleClonado.dataset.id_producto = elem.querySelector("id").textContent;
        botones.append(btnDisponibleClonado);
        btnDisponibleClonado.addEventListener("click", disponible, false);
        pie.append(botones);
        card.append(cuerpo);
        card.append(lista);
        todo.append(card);
        card.append(pie);
    });
    return todo;
}

function vendido(oEvento) {
    let oE = oEvento || window.event;
    let id = oE.currentTarget.dataset.id_producto;
    $.post("php/venderRopa.php", ("id="+id), function(respuesta) {
        alert(respuesta.mensaje);
        if (respuesta.error == 0) {
            location.reload();
        }
    }, "json");
}

function disponible(oEvento) {
    let oE = oEvento || window.event;
    let id = oE.currentTarget.dataset.id_producto;
    $.post("php/disponibleRopa.php", ("id="+id), function(respuesta) {
        alert(respuesta.mensaje);
        if (respuesta.error == 0) {
            location.reload();
        }
    }, "json");
}
