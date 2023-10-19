//datos almacenados 

let codigoAlmacenado = "4622";


//datos proporcionados

let codigoProporcionado = prompt("ingrese su codigo");

//bucle concicional

while(codigoProporcionado != codigoAlmacenado){
    switch(codigoProporcionado){
        case "":
            alert("debes colocar tu codigo");
            break

        default:
            alert(`${codigoProporcionado} no es un codigo valido`);
    }
    codigoProporcionado = prompt("vuelve a colocar tu codigo");
}


alert("bienvenido a calculadolar");





let continuar = ""

//ejecutamos la accion en un bucle

while(continuar != "NO" ){

    //damos a elegir la accion a realizar

    let intenciones = prompt(`que quiere hacer?? 
    1--el equivalente en pesos de tus dolares
    2--el equivalente en dolares de tus pesos`);
   
    switch(intenciones){

        //filtramos la respuesta

        case "1":
            let dolares = prompt("introduzca la cantidad de dolares");
            alert(`la cantidad de pesos seria de ${dolares * 795}`);
            break;

        case "2":
            let pesos = prompt("introduzca la cantidad de pesos");
            alert(`la cantidad de dolares seria de ${pesos / 800}`);
            break;

        default:
            alert("la operacion no es valida");
            break;
    }

    // consultamos si desea repetir el bucle

    continuar = prompt(`si desea continuar?
    SI
    NO`);
}

//damos por finalizada la visita

alert("gracias por confiar en calculadolar, vuelva pronto");