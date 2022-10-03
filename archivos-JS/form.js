let infoForm = []

class Datos {
  constructor(nombre, tel, correo) {
    this.nombre = nombre;
    this.tel = tel;
    this.correo = correo;
  }
};

const formulario = document.querySelector("#formulario");
const button = document.querySelector("#submitButton");

//crear el evento
formulario.addEventListener("submit", validarFormulario);

//mi funcion
function validarFormulario(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value
  const tel = document.querySelector("#tel").value
  const correo = document.querySelector("#correo").value

  const respuesta = document.getElementById("respuesta");
  // asi como esta ahora toma los datos del formulario y los puedo mostrar en la respuesta pero no guardar en el sessionStorage
  respuesta.textContent = `Hola ${nombre}, Gracias por comprar con nosotros. En breve nos contactaremos contigo al tel:${tel} y/o correo:${correo} para definir el modo de pago. Esperamos verte pronto..`

  infoForm.push(new Datos(nombre, tel, correo));
}

sessionStorage.setItem("guardarForm", JSON.stringify(infoForm));
let guardarForm = JSON.parse(sessionStorage.getItem("guardarForm"));

// me devuelve los el array Datos con los atritutos cargados por imput
// console.log(infoForm);
// // no me devuelve nada
// console.log(guardarForm)