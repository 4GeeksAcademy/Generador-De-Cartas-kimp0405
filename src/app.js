import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {

  const palos = ["♠", "♥", "♦", "♣"];
  const numeros = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  // Genera una carta aleatoria
  function generarCartaRandom() {
    const palo = palos[Math.floor(Math.random() * palos.length)];
    const numero = numeros[Math.floor(Math.random() * numeros.length)];
    return { palo, numero };
  }

  // Actualiza cualquier grupo de cartas
  function actualizarGrupo(selector) {
    const cartas = document.querySelectorAll(selector);

    cartas.forEach(carta => {
      const { palo, numero } = generarCartaRandom();

      // si es la carta oculta la revelamos
      carta.classList.remove("carta-back");

      carta.innerHTML = `
      <div class="d-flex justify-content-start"><p class="item-top">${palo}</p></div>
      <div class="d-flex justify-content-center"><p class="item-center">${numero}</p></div>
      <div class="d-flex justify-content-end"><p class="item-bottom">${palo}</p></div>
    `;

      carta.style.color = (palo === "♥" || palo === "♦") ? "red" : "black";
    });
  }

  // REFRESCA ambos grupos de cartas
  function refrescarCartas() {
    actualizarGrupo("#cartas-arriba .body-carta");   // arriba (radom independiente)
    actualizarGrupo("#cartas-container .body-carta"); // abajo (random independiente)
  }

  // BOTÓN NORMAL
  document.getElementById("btn-refresh").addEventListener("click", refrescarCartas);

  // BOTÓN CON TEMPORIZADOR
  let timerActivo = false;

  document.getElementById("btn-timer").addEventListener("click", () => {
    if (timerActivo) return;

    timerActivo = true;
    let tiempo = 5;
    const btn = document.getElementById("btn-timer");

    btn.textContent = `Generando en ${tiempo}s`;
    btn.disabled = true;

    const intervalo = setInterval(() => {
      tiempo--;
      btn.textContent = `Generando en ${tiempo}s`;

      if (tiempo === 0) {
        clearInterval(intervalo);
        refrescarCartas();
        btn.textContent = "Auto-generar en 5s";
        btn.disabled = false;
        timerActivo = false;
      }
    }, 1000);
  });


  console.log("Hello Rigo from the console!");
};
