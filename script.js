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
console.log('(DEBUG) número secreto:', + numeroSecreto)

function cercania() {
  let diferencia = Math.abs(inputIntento.value - numeroSecreto); 
  return diferencia <= 10 ? '🔥 ¡Estás cerca!' : '❄️ Estás lejos';
}

function mensajeIntentos() {
  if (intentos <= 3)  return '🔥 Vas genial';
  if (intentos <= 6)  return '😅 Sigue intentando';
  if (intentos <= 9)  return '⚠️ ¡Cuidado, casi sin intentos!';
  return '💀 ¡Perdiste!';
}

function verificarIntento() {
  let valor = Number(inputIntento.value);

  if (isNaN(valor) || valor < 1 || valor > 100) {
    mostrarMensaje('⚠️ Ingresa un número del 1 al 100', 'orange');
    return;
  }
 intentos++;
  contador.textContent = 'Intentos: ' + intentos + ' / 10' + mensajeIntentos();

  // Agregar al historial
  historialIntentos.push(valor);
  historial.textContent = 'Historial: ' + historialIntentos.join(', ');


  if (valor === numeroSecreto) {
    mostrarMensaje('🎉 ¡Correcto! Era el ' + numeroSecreto,'#3ed12b');
    btnAdivinar.disabled = true;
    btnReiniciar.style.display = 'inline-block';
    afirmarTarjeta();
    tarjeta.style.boxShadow = '0 0 40px rgba(64, 247, 73, 0.9)';
  } else if (valor > numeroSecreto) {
    mostrarMensaje('Muy alto ↓ ' + cercania() + ' ', 'hsla(19, 100%, 61%, 0.91)'); 
    tarjeta.style.borderColor = '#d60000';
    tarjeta.style.boxShadow = '0 0 40px hsla(19, 100%, 61%, 0.91)';
    sacudirTarjeta();
  } 
  else{
    mostrarMensaje('Muy bajo ↓ ' + cercania() + ' ', 'rgba(46, 43, 196, 0.84)'); 
    tarjeta.style.borderColor = '#000535';
    tarjeta.style.boxShadow = '0 0 40px rgba(46, 43, 196, 0.84)';
    sacudirTarjeta();
  }

  if (intentos >= 10 && valor !== numeroSecreto) {
  mostrarMensaje('❌ ¡Sin intentos! El número era: ' + numeroSecreto, '#e4193b');
  btnAdivinar.disabled = true;
  btnReiniciar.style.display = 'inline-block';
  tarjeta.style.boxShadow = '0 0 40px rgba(212, 7, 7, 0.91)';
  sacudirTarjeta();
}
  
  inputIntento.value = ' ';
  inputIntento.focus();
}


btnAdivinar.addEventListener('click', verificarIntento);
function reiniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentos = 0;
  historialIntentos = [];

  contador.textContent = 'Intentos: 0 / 10';
  historial.textContent = 'Historial: ';
  mostrarMensaje('🎯 ¡Nuevo juego! Adivina el número...', '#e94560');

  btnAdivinar.disabled = false;
  btnReiniciar.style.display = 'none';
  inputIntento.value = '';
  inputIntento.focus();

  
  tarjeta.style.borderColor = 'rgba(255, 0, 43, 0.8)';
  tarjeta.style.boxShadow = '0 8px 32px rgba(255, 0, 0, 0.74)';

  console.log('(DEBUG) Nuevo número secreto:', numeroSecreto);
}

btnReiniciar.addEventListener('click', reiniciarJuego);

inputIntento.addEventListener('keypress', function(evento) {
  if (evento.key === 'Enter') {
    verificarIntento();
  }
});

function sacudirTarjeta() {
  tarjeta.classList.add('shake');
  tarjeta.addEventListener('animationend', () => {
    tarjeta.classList.remove('shake'); 
  }, { once: true }); 
}

function afirmarTarjeta() {
  tarjeta.classList.add('affirm');
  tarjeta.addEventListener('animationend', () => {
    tarjeta.classList.remove('affirm');
  }, { once: true });
}

function mostrarMensaje(texto, color, cercaniaTexto = '') {
  mensaje.textContent = texto + (cercaniaTexto ? '  ' + cercaniaTexto : '');
  mensaje.style.color = color;
}

mostrarMensaje('¡Bienvenido al juego!', '#e94560');
