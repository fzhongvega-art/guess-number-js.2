const inputIntento = document.getElementById('inputIntento');
const btnAdivinar = document.getElementById('btnAdivinar');
const mensaje = document.getElementById('mensaje');
const contador = document.getElementById('contador');
const historial = document.getElementById('historial');
const btnReiniciar = document.getElementById('btnReiniciar');
const tarjeta = document.getElementById('game-card');

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historialIntentos = [];
function verificarIntento() {
  let valor = Number(inputIntento.value);

  if (isNaN(valor) || valor < 1 || valor > 100) {
    mostrarMensaje('⚠️ Ingresa un número del 1 al 100', 'orange');
    return;
  }
 intentos++;
  contador.textContent = 'Intentos: ' + intentos;

  // Agregar al historial
  historialIntentos.push(valor);
  historial.textContent = 'Historial: ' + historialIntentos.join(', ');

  // Comparar con el número secreto
  if (valor === numeroSecreto) {
    mostrarMensaje('🎉 ¡Correcto! Era el ' + numeroSecreto, '#ff0000');
    btnAdivinar.disabled = true;
    btnReiniciar.style.display = 'inline-block';
    // Celebración visual: la tarjeta brilla verde
    tarjeta.style.borderColor = '#ffffff';
    tarjeta.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.3)';
  } else if (valor > numeroSecreto) {
    mostrarMensaje('📈 Muy alto. Intenta más bajo.', '#ff6b6b');
  } else {
    mostrarMensaje('📉 Muy bajo. Intenta más alto.', '#4ecdc4');
  }

  // Limpiar input y enfocar
  inputIntento.value = '';
  inputIntento.focus();
}

btnAdivinar.addEventListener('click', verificarIntento);
function reiniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  historialIntentos = [];

  contador.textContent = 'Intentos: 0';
  historial.textContent = 'Historial: ';
  mostrarMensaje('🎯 ¡Nuevo juego! Adivina el número...', '#e94560');

  btnAdivinar.disabled = false;
  btnReiniciar.style.display = 'none';
  inputIntento.value = '';
  inputIntento.focus();

  // Resetear celebración visual
  tarjeta.style.borderColor = 'rgba(233, 69, 96, 0.3)';
  tarjeta.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';

  console.log('(DEBUG) Nuevo número secreto:', numeroSecreto);
}

// --- Conectar botón reiniciar ---
btnReiniciar.addEventListener('click', reiniciarJuego);

inputIntento.addEventListener('keypress', function(evento) {
  if (evento.key === 'Enter') {
    verificarIntento();
  }
});




function mostrarMensaje(texto, color) {
  mensaje.textContent = texto;
  mensaje.style.color = color;
}

mostrarMensaje('¡Bienvenido al juego!', '#e94560');


