"use strict";

const fs = require("fs");
const readline = require("readline");
const { DateTime } = require("luxon");

const rl = readline.createInterface(process.stdin, process.stdout);
let semillas = require('./cultivos.json');

function leeLinea(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (introducido) => {
      resolve(introducido);
    });
  });
}

function mostrarListaSemillas() {
  console.log("Lista de semillas disponibles:");
  semillas.forEach((semilla, index) => {
    console.log(`${index + 1}. ${semilla.nombre}`);
  });
}

function guardarSemillas() {
  fs.writeFile("cultivos.json", JSON.stringify(semillas), (err) => {
    if (err) {
      console.log("Error al guardar los cultivos:", err);
    } else {
      console.log("Los cultivos se han guardado correctamente.");
    }
  });
}

function actualizarEstadoCultivos() {
  semillas.forEach((cultivo) => {
    if (cultivo.plantado && !cultivo.regado) {
      console.log(`El cultivo ${cultivo.nombre} (${cultivo.id}) necesita ser regado.`);
    }
    if (cultivo.plantado && !cultivo.recolectado) {
      console.log(`El cultivo ${cultivo.nombre} (${cultivo.id}) está listo para ser recolectado.`);
    }
  });
}

async function menu() {
  console.log("|==================================|");
  console.log("|                                  |");
  console.log("|              Menú                |");
  console.log("|                                  |");
  console.log("|1. Plantar Cultivo                |");
  console.log("|2. Regar Cultivo                  |");
  console.log("|3. Recolectar Cultivo             |");
  console.log("|4. Listar Cultivos                |");
  console.log("|5. Eliminar Cultivo               |");
  console.log("|6. Consultar Cultivos Recolectados|");
  console.log("|7. Salir                          |");
  console.log("\\__________________________________/");

  let opcion = await leeLinea("\nSelecciona una opción: ");
  switch (opcion) {
    case "1":
      await plantarCultivo();
      break;
    case "2":
      await regarCultivo();
      break;
    case "3":
      await recolectarCultivo();
      break;
    case "4":
      listarCultivos();
      break;
    case "5":
      await eliminarCultivo();
      break;
    case "6":
      await consultarCultivosRecolectados();
      break;
    case "7":
      exit();
    default:
      console.log("Opción no válida. Introduce un número del 1 al 7");
      return menu();
  }
}

async function plantarCultivo() {
  mostrarListaSemillas();

  let semillaSeleccionada = await leeLinea("Escribe el nombre de la semilla que deseas plantar: ");
  let semilla = semillas.find((sem) => sem.nombre === semillaSeleccionada);
  if (!semilla) {
    console.log("Cultivo no válido. Introduce un cultivo válido.");
    return menu();
  }

  let cantidad = NaN;
  while (isNaN(cantidad) || cantidad <= 0) {
    let cantidadTexto = await leeLinea(
      `Ingresa la cantidad de ${semilla.nombre} que deseas plantar: `
    );
    cantidad = parseInt(cantidadTexto);

    if (isNaN(cantidad) || cantidad <= 0) {
      console.log("Cantidad no válida, introduce otra cantidad: ");
    }
  }

  for (let i = 1; i <= cantidad; i++) {
    semillas.push({
      nombre: semilla.nombre,
      id: `${semilla.nombre}-${i}`,
      plantado: true,
      regado: false,
      recolectado: false,
    });
  }

  guardarSemillas();
  console.log(`Se han plantado ${cantidad} cultivos de ${semilla.nombre}.`);
  menu();
}

async function regarCultivo() {
  console.log("Lista de cultivos:");
  semillas.forEach((cultivo) => {
    console.log(`- ${cultivo.nombre}:`);
    console.log(`  ID: ${cultivo.id}`);
    console.log(`  Plantado: ${cultivo.plantado}`);
    console.log(`  Regado: ${cultivo.regado}`);
    console.log(`  Recolectado: ${cultivo.recolectado}`);
    console.log("----------------------------------");
  });

  let id = await leeLinea("Introduce el ID del cultivo a regar: ");

  let cultivo = semillas.find((c) => c.id === id);
  if (!cultivo) {
    console.log("ID no válido. Introduce un ID válido.");
    return menu();
  }

  if (cultivo.regado) {
    console.log("El cultivo ya ha sido regado recientemente.");
    return menu();
  }

  cultivo.regado = true;
  guardarSemillas();
  console.log(`Se ha regado el cultivo ${cultivo.nombre} (${cultivo.id}).`);
  menu();
}

async function recolectarCultivo() {
  console.log("Lista de cultivos:");
  semillas.forEach((cultivo) => {
    console.log(`- ${cultivo.nombre}:`);
    console.log(`  ID: ${cultivo.id}`);
    console.log(`  Plantado: ${cultivo.plantado}`);
    console.log(`  Regado: ${cultivo.regado}`);
    console.log(`  Recolectado: ${cultivo.recolectado}`);
    console.log("----------------------------------");
  });

  let id = await leeLinea("Introduce el ID del cultivo a recolectar: ");

  let cultivo = semillas.find((c) => c.id === id);
  if (!cultivo) {
    console.log("ID no válido. Introduce un ID válido.");
    return menu();
  }

  if (cultivo.recolectado) {
    console.log("El cultivo ya ha sido recolectado.");
    return menu();
  }

  cultivo.recolectado = true;
  guardarSemillas();
  console.log(`Se ha recolectado el cultivo ${cultivo.nombre} (${cultivo.id}).`);
  menu();
}

function listarCultivos() {
  console.log("Lista de cultivos:");
  semillas.forEach((cultivo) => {
    console.log(`- ${cultivo.nombre}:`);
    console.log(`  ID: ${cultivo.id}`);
    console.log(`  Plantado: ${cultivo.plantado}`);
    console.log(`  Regado: ${cultivo.regado}`);
    console.log(`  Recolectado: ${cultivo.recolectado}`);
    console.log("----------------------------------");
  });
  console.log("");
  menu();
}

async function eliminarCultivo() {
  console.log("Lista de cultivos:");
  semillas.forEach((cultivo) => {
    console.log(`- ${cultivo.nombre}:`);
    console.log(`  ID: ${cultivo.id}`);
    console.log(`  Plantado: ${cultivo.plantado}`);
    console.log(`  Regado: ${cultivo.regado}`);
    console.log(`  Recolectado: ${cultivo.recolectado}`);
    console.log("----------------------------------");
  });

  let id = await leeLinea("Introduce el ID del cultivo a eliminar: ");

  let index = semillas.findIndex((c) => c.id === id);
  if (index === -1) {
    console.log("ID no válido. Introduce un ID válido.");
    return menu();
  }

  semillas.splice(index, 1);
  guardarSemillas();
  console.log(`Se ha eliminado el cultivo con ID ${id}.`);
  menu();
}

function consultarCultivosRecolectados() {
  let cultivosRecolectados = semillas.filter((c) => c.recolectado);

  if (cultivosRecolectados.length === 0) {
    console.log("No se han recolectado cultivos hasta el momento.");
  } else {
    console.log("Cultivos recolectados:");
    cultivosRecolectados.forEach((cultivo) => {
      console.log(`- ${cultivo.nombre}:`);
      console.log(`  ID: ${cultivo.id}`);
    });
  }
  console.log("");
  menu();
}

function iniciarIntervalos() {
  setInterval(actualizarEstadoCultivos, 10000); // Actualiza el estado cada 10 segundos
}

menu();
iniciarIntervalos();