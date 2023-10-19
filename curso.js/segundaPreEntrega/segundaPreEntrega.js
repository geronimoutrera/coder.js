
//datos almacenado
//datos proporcionados

alert("bienvenido a calculadolar");

let crearCuentaNombre = prompt("ingrese un nombre para su usuario");

 while(crearCuentaNombre == ""){

     crearCuentaNombre = prompt("debes colocar un nombre");
}

alert(`holaa ${crearCuentaNombre}`);

let crearCuentaContraseña = prompt("ingrese una contrañesa segura para su usuario");

while(crearCuentaContraseña === ""){

    crearCuentaContraseña = prompt("debes colocar una contraseña");
}

let crearCuentaContraseñaR = prompt("vuelva a ingrasar la contraseña");

while(crearCuentaContraseñaR != crearCuentaContraseña){

    crearCuentaContraseñaR = prompt("las contraseñas no coinciden");
}



const monedas = [
    {moneda: "dolar", precio: 1000},
    {moneda: "euro", precio: 1100},
    {moneda: "yuan", precio: 650}
]

for (let c of monedas) {
    let contenedor = document.createElement("div")
    contenedor.innerHTML = `
    <h4>moneda: ${c.moneda}</h4>
    <p>Precio: ${c.precio}</p>
    `
    document.body.appendChild(contenedor)

}

function convertir(a,b){
    const m = monedas.find((x) => x.moneda === a)
    const m2 = m.precio
    const result = m2 * b
    return result
}
 


let accion = prompt(`que moneda desea convertir a pesos?
dolar
euro
yuan`);

let accionC = prompt(`indica la cantidad de ${accion} que desea convertir a pesos`)

const resultado = convertir(accion, accionC)

alert(resultado)




