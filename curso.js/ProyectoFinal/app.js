/*

// HTML CSS/BOOSTRAP JS JSON 

Codigo limpio, funciones que no se utilicen. Sacar los clg..
No Alerts
los inputs deben existir. nada de prompt

Objetos y Arrays (Metodos de Array)
Funciones y condicionales
DOM y Eventos
//SINTAXIS AVANZADAS > OPERADORES TERNARIOS
Librerias > SweetAlert2
Promesas con fetch
Carga de json o apis externa

*/
function mostrarBienvenida() {
    const usuarioAlmacenado = localStorage.getItem('usuario');

    if (usuarioAlmacenado) {
        //creamos el mensaje
        const usuario = JSON.parse(usuarioAlmacenado);
        const nombre = usuario[0].nombre;
        const apellido = usuario[1].apellido;
        //mostramos el mensaje
        Swal.fire({
            title: `¡Bienvenido, ${nombre} ${apellido}!`,
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
            
        });
        setTimeout(() => {
            location.href = "index.html";
        }, 3000);
    }
}

async function logeo() {
    const logeoButton = document.querySelector("#logeo");

    logeoButton.addEventListener("click", async () => {
        console.log("funciona");

        // Preguntar la edad utilizando SweetAlert
        const { value: edad } = await Swal.fire({
            title: "Verificar Edad",
            html: '<input type="number" id="swal-edad" class="swal2-input" placeholder="Ingresa tu edad">',
            focusConfirm: false,
            preConfirm: () => {
                return document.getElementById('swal-edad').value;
            }
        });

        // Verificar si la edad es mayor o igual a 18
        if (parseInt(edad, 10) >= 18) {
            const { value: formValues } = await Swal.fire({
                title: "Coloca su nombre y apellido",
                html: `
                    <input id="swal-input1" class="swal2-input">
                    <input id="swal-input2" class="swal2-input">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        { "nombre": document.querySelector("#swal-input1").value },
                        { "apellido": document.querySelector("#swal-input2").value }
                    ];
                }
            });

            if (formValues) {
                Swal.fire(JSON.stringify(formValues));
                localStorage.setItem('usuario', JSON.stringify(formValues));
                mostrarBienvenida(formValues[0].nombre, formValues[1].apellido);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Acceso Denegado',
                text: 'Lo siento, debes ser mayor de edad para acceder.',
            });
        }
    });
}
//llamamos la funcion luego de cargar el dom
document.addEventListener("DOMContentLoaded", function () {
    logeo();
});

// Array localStorage de monedas disponibles
const monedasDisponibles = ['USD', 'EUR', 'BTC', 'ARS']; //Agregar o quitar


// Obtiene las tasas de cambio mediante el fetch
async function obtenerTasasDeCambio() {
   try {
      const response = await fetch("https://openexchangerates.org/api/latest.json?app_id=ff3eaeb5214b402b9d2a313e7616fd30");
      if (!response.ok) {
         throw new Error('Error al obtener las tasas de cambio');
      }
      const data = await response.json();
      return data.rates;
   } catch (error) {
      console.error('Error:', error);
   }
}

// Llena los selectores con las monedas disponibles
async function llenarSelectores() {
   const tasasDeCambio = await obtenerTasasDeCambio();

   const monedaOrigenSelect = document.getElementById('monedaOrigen');
   const monedaDestinoSelect = document.getElementById('monedaDestino');

   for (const moneda of monedasDisponibles) {
      const optionOrigen = document.createElement('option');
      optionOrigen.value = moneda;
      optionOrigen.textContent = moneda;
      monedaOrigenSelect.appendChild(optionOrigen);

      const optionDestino = document.createElement('option');
      optionDestino.value = moneda;
      optionDestino.textContent = moneda;
      monedaDestinoSelect.appendChild(optionDestino);
   }
}

function convertirDivisas() {
  const cantidad = parseFloat(document.getElementById('cantidad').value);
  const monedaOrigen = document.getElementById('monedaOrigen').value;
  const monedaDestino = document.getElementById('monedaDestino').value;

  // Obtén las tasas de cambio
  obtenerTasasDeCambio().then(tasasDeCambio => {
     // Verifica que las tasas de cambio existan para las monedas seleccionadas
     if (tasasDeCambio[monedaOrigen] && tasasDeCambio[monedaDestino]) {
        // Realiza el cálculo de conversión
        const resultado = cantidad * (tasasDeCambio[monedaDestino] / tasasDeCambio[monedaOrigen]);

        const resultadoElemento = document.getElementById('resultado');
        resultadoElemento.textContent = `Resultado de la conversión: ${resultado.toFixed(2)} ${monedaDestino}`;

        // Añadir la conversión al historial
        agregarAlHistorial({
            cantidad: cantidad,
            monedaOrigen: monedaOrigen,
            monedaDestino: monedaDestino,
            resultado: resultado.toFixed(2),
            fecha: new Date().toLocaleString()
        });
   
      } else {
        console.error('Las tasas de cambio para las monedas seleccionadas no están disponibles.');
     }
  });
}

function agregarAlHistorial(conversion) {
    // Obtén el historial actual del localStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];

    // Añade la nueva conversión al inicio del historial
    historial.unshift(conversion);

    // Limita el historial a las últimas 5 conversiones
    const historialLimitado = historial.slice(0, 5);

    // Almacena el historial actualizado en el localStorage
    localStorage.setItem('historial', JSON.stringify(historialLimitado));

    // Actualiza la visualización del historial en la interfaz
    mostrarHistorial();
}

function mostrarHistorial() {
    const historialContainer = document.getElementById('historial');
    historialContainer.innerHTML = ''; // Limpia el contenido actual

    // Obtiene el historial del localStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];

    // Muestra las últimas conversiones en el historial
    for (const conversion of historial) {
        const conversionHTML = `
            <p>${conversion.cantidad} ${conversion.monedaOrigen} = ${conversion.resultado} ${conversion.monedaDestino} (${conversion.fecha})</p>
        `;
        historialContainer.innerHTML += conversionHTML;
    }
}

const mostrarHistorialButton = document.getElementById('historialboton');

if (mostrarHistorialButton) {
    mostrarHistorialButton.addEventListener('click', mostrarHistorial);
}

// Llena los selectores al cargar la página
llenarSelectores();



