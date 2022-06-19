// Juego tres en rasha UwU

// Variables globales y llamado de HTML
let icon = ['O', 'X'];
let iconCheck = 0;
let turn = 1;
let gameOver = false;
let textVictory = document.getElementById('textVictory');
let buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(x => x.addEventListener('click', putIcon));

// funciones para pulsar el boton y condicion del juego
function putIcon(e) {
  let pulsedBtn = e.target;
  if (!gameOver && pulsedBtn.innerHTML == '') {
    pulsedBtn.innerHTML = icon[turn];
    iconCheck++;

    let conditionGame = condition();
    if (conditionGame == 0) {
      changeTurn();
      if (iconCheck < 9) {
        computer();
        conditionGame = condition();
        iconCheck++;
        changeTurn();
      }
    }

    // Texto de ganador o empate
    if (conditionGame == 1) {
      gameOver = true;
      textVictory.innerHTML = 'Felicidades ganaste ';
    }
    else if (conditionGame == -1) {
      gameOver = true;
      textVictory.innerHTML = 'Gana la computadora';
    }
    else if (iconCheck == 9) {
      gameOver = true;
      textVictory.innerHTML = 'Empate';

    }

  }

}

// cambio de turno
function changeTurn() {
  if (turn == 1) {
    turn = 0;
  }
  else {
    turn = 1;
  }
}

// funcion de estado del juego
function condition() {
  potitionVictory = 0;
  aStatus = 0;

  // Cambiar el color de lineas si son iguales (Ganador)
  function same(...args) {
    valor = args.map(x => x.innerHTML);
    if (valor[0] != '' && valor.every((x, i, arr) => x === arr[0])) {
      args.forEach(x => x.style.backgroundColor = '#63A2F8')
      return true;
    }
    else {
      return false;
    }
  }

  // comprovar condiciones de victoria
  if (same(buttons[0], buttons[1], buttons[2])) {
    potitionVictory = 1;
  }
  else if (same(buttons[3], buttons[4], buttons[5])) {
    potitionVictory = 2;
  }
  else if (same(buttons[6], buttons[7], buttons[8])) {
    potitionVictory = 3;
  }
  else if (same(buttons[0], buttons[3], buttons[6])) {
    potitionVictory = 4;
  }
  else if (same(buttons[1], buttons[4], buttons[7])) {
    potitionVictory = 5;
  }
  else if (same(buttons[2], buttons[5], buttons[8])) {
    potitionVictory = 6;
  }
  else if (same(buttons[0], buttons[4], buttons[8])) {
    potitionVictory = 7;
  }
  else if (same(buttons[2], buttons[4], buttons[6])) {
    potitionVictory = 8;
  }

  // definir y comprovar victoria
  if (potitionVictory > 0) {
    if (turn == 1) {
      aStatus = 1;
    }
    else {
      aStatus = -1;
    }
  }
  return aStatus;
}

// moviemiento de la IA en el juego
function computer() {
  function random(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let valor = buttons.map(x => x.innerHTML);
  let pot = -1;
  if (valor[4] == '') {
    pot = 4;
  }
  else {
    let nums = random(0, buttons.length - 1);
    while (valor[nums] != '') {
      nums = random(0, buttons.length - 1);
    }
    pot = nums;
  }
  buttons[pot].innerHTML = "O";
  return pot;
}