// logger-cli/src/app.js
const os = require('os');

//practica 1
function registroSistema() {
  console.log("=== Inicio del sistema ===");
  console.time("ProcesoPrincipal");

  function accesoUsuario(usuario) {
    console.count(`Acceso de usuario ${usuario}`);
  }

  accesoUsuario('Carlos');
  accesoUsuario('Ana');
  accesoUsuario('Carlos');

  console.warn("Capacidad de usuarios alcanzando el límite");
  console.error("Error: No se pudo conectar a la base de datos");

  const usuarios = [
    { nombre: "Carlos", rol: "Admin" },
    { nombre: "Ana", rol: "User" }
  ];

  console.table(usuarios);

  console.timeEnd("ProcesoPrincipal");
  console.log("=== Fin del sistema ===");
}

//practica 2
function iniciarCLI() {
  console.log('Bienvenido a la CLI de ejemplo');
  console.log('Comandos disponibles: hola, tiempo, salir');
  process.stdout.write('Ingresa un nuevo comando: ');

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (data) => {
    const input = data.trim().toLowerCase();

    switch (input) {
      case 'hola':
        console.log('¡Hola! ¿Cómo estás?');
        break;
      case 'tiempo':
        console.log(`Tiempo activo: ${process.uptime().toFixed(2)} segundos`);
        break;
      case 'salir':
        console.log('Saliendo...');
        process.exit(0);
        break;
      default:
        console.log('Comando no reconocido');
    }

    process.stdout.write('Ingresa un nuevo comando: ');
  });
}

//practica 3
function iniciarMonitor(opts = { clear: true, intervalMs: 5000 }) {
  function mostrarInfoSistema() {
    if (opts.clear) console.clear();
    console.log("=== Información del Sistema ===");
    console.log(`Sistema Operativo: ${os.type()} ${os.release()}`);
    console.log(`Arquitectura: ${os.arch()}`);
    const cpus = os.cpus();
    console.log(`CPU (modelo): ${cpus && cpus[0] ? cpus[0].model : 'N/A'}`);
    console.log(`Número de CPUs: ${cpus ? cpus.length : 'N/A'}`);
    console.log(`Memoria Libre: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Memoria Total: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Tiempo de actividad: ${(os.uptime() / 60).toFixed(2)} minutos`);
    console.log("==============================");
  }

  // mostrar inmediatamente y luego cada X ms
  mostrarInfoSistema();
  const id = setTimeout(mostrarInfoSistema, opts.intervalMs);

  // devolver función para detener el monitor si se quiere
  return () => clearInterval(id);
}


const opcion = process.argv[2];         
const noClearFlag = process.argv.includes('--no-clear'); 

console.log("=== Proyecto system-analitics / logger-cli ===");
console.log("Uso: node src/app.js <registro|cli|monitor|all> [--no-clear]");

switch (opcion) {
  case 'registro':
    registroSistema();
    break;

  case 'cli':
    iniciarCLI();
    break;

  case 'monitor':
    iniciarMonitor({ clear: !noClearFlag, intervalMs: 5000 });
    break;

  case 'all':
    // Ejecuta registro una vez, luego inicia monitor y CLI simultáneamente.
    registroSistema();
    iniciarMonitor({ clear: !noClearFlag, intervalMs: 5000 });
    iniciarCLI();
    break;

  default:
    console.log("Por favor especifica una opción: registro | cli | monitor | all");
    break;
}
