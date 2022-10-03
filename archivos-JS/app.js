let tienda = document.querySelector("div#tienda");
let lista = document.querySelector("div#listaStock");
let temp = document.querySelector("template");
let card = temp.content.querySelector(".card");

let verCarrito = document.querySelector("#verCarrito");
verCarrito.className = "ver-carrito";
let modalContainer = document.querySelector("#modalContainer");

stock.forEach((elm) => {
  let cardClon = card.cloneNode(true);

  cardClon.querySelector("h5").innerText = elm.nombre;
  cardClon.querySelector("p").innerText = elm.calidCantidad;
  cardClon.querySelector("h4").innerText = "$" + elm.precio;
  cardClon.querySelector("button").innerText = "comprar";

  lista.appendChild(cardClon)

  cardClon.children[0].src = elm.img;

  // function sendCarrito()
  cardClon.querySelector("button").addEventListener("click", function sendCarrito() {
    let productoId = elm.id;
    let cantidad = Number(prompt("Cantidad:"));

    if (!isNaN(cantidad) && cantidad != null && cantidad != ""){
      let producto = stock.find((product) => product.id === productoId);
      producto.cantidad = cantidad;
      producto.total = producto.precio * cantidad;
      carrito.push(producto);
    } 
    // console.log(carrito)

    localStorage.setItem("guardarCarrito", JSON.stringify(carrito));
    const carrito1 = JSON.parse(localStorage.getItem("guardarCarrito"));
  
  })
});

verCarrito.addEventListener("click", () => {
  // hoy cuando probe el innerText=""; me limpiaba el carrito, nose si modifique algo o que...
  modalContainer.innerText = "";
  modalContainer.style.display = "flex";
  const modalButton = document.createElement("h2");
  modalButton.className = "modal-header-button"
  modalButton.innerText = "❌"

  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalContainer.appendChild(modalButton);

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `<h1 class="modal-header-title"> Tu Carrito</h1>`;

  modalContainer.appendChild(modalHeader);

  carrito.forEach((elm) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${elm.img}">
    <h5 class="card-title">${elm.nombre}</h5>
    <h4 style="text-align:center;">$${elm.precio} * ${elm.cantidad} Unidades =$${elm.total}</h4>`;

    modalContainer.appendChild(carritoContent);
  });

  function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.total;
    });
    return total;
  }

  const total = calcularTotal(carrito)
  let totaletiquet = document.createElement("div");
  totaletiquet.className = "total-content";
  totaletiquet.innerHTML = `Tu Total a Pagar es: $${total} <br>
  <a href="#formulario" class=" renderizar"> ¿Terminaste de comprar? <br>👉Completa el formulario de Contacto👈</a>
  `

  // si yo quiero usar el let respuesta=`...(lo de abajo)` pero si llamo ${nombre}> da undefined y si pongo ${infoForm.nombre}> da [object HTMLInputElement]
  // como deberia llamarlo entonces?
  // Hola ${infoForm.nombre}, Gracias por comprar con nosotros. En breve nos contactaremos contigo al tel:${infoForm.tel} y/o correo:${infoForm.correo} para definir el modo de pago. Esperamos verte pronto..

  modalContainer.appendChild(totaletiquet);

});


