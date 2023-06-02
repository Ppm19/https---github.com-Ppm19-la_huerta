"use strict";

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
const { exit } = require("process");

function leeLinea(texto) {
    return new Promise((resolve, rejects) => {
        rl.question(texto, (introducido) => {
            resolve(introducido);
        });
    });
}

async function menu(){

    console.log("|=================================|")
    console.log("|              Menú               |")
    console.log("|                                 |")
    console.log("|1.Plantar Cultivo                |")
    console.log("|2.Regar Cultivo                  |")
    console.log("|3.Recolectar Cultivo             |")
    console.log("|4.Listar Cultivos                |")
    console.log("|5.Eliminar Cultivo               |")
    console.log("|6.Consultar Cultivos Recolectados|")
    console.log("|7.Salir                          |")
    console.log("\\_________________________________/")

    let opcion = await leeLinea("\nSelecciona una opción: ")
    switch(opcion){
        case "1":
            break;
        case "2":
            break;
        case "3":
            break;
        case "4":
            break;
        case "5":
            break;
        case "6":
            break;
        case "7":
            exit();
        default:
            console.log("Opción no valida, introduce un número del 1 al 7")
            let enter = await leeLinea("Pulsa enter para continuar")
            return menu()
    }
}

menu()