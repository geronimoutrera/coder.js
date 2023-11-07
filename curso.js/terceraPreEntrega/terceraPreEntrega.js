//creamos el contenido del html

let contenedor = document.createElement("div");
contenedor.innerHTML = `
<p>ingrese la cantidad de dolares</p>
<h></h>
<input id="dolares" type="number">
<h></h>
<button id="btnMain">CALCULAR</button>
<h3>el resultado en pesos es de</h3>
<p2></p2>
<h2>historial de calculos</h2>
<p3></p3>
`

//lo agregamos al html
document.body.appendChild(contenedor);


let imput = document.getElementById("dolares");



//creamos funcion para cmultiplicar
function resulta(a,b){
    const resultado = a * b
    return resultado
};


//establecemos las acciones del boton
let boton = document.getElementById("btnMain");
boton.onclick = () => {
    const result = document.querySelector("p2").textContent = resulta(imput.value, 900);
    const almacenar = {"dolares": imput.value, "pesos": resulta(imput.value, 900)};
    //guardamos en el storage
    const enJson = JSON.stringify(almacenar);
    localStorage.setItem("productoA", enJson);
}

// recuperamos la informacion del storage
const xxx = localStorage.getItem("productoA")
const xxxx = JSON.parse(xxx)

//graficamos en el html
const contenedora = document.querySelector("p3").textContent = `dolares = ${xxxx.dolares} / pesos = ${xxxx.pesos}`