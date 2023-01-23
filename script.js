"use strict";

// Izabrani elementi
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//Pocetna Faza

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Funkcija bacanje kockice

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.Generisati random bacanje
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Prikazati kockicu

    diceEl.classList.remove("hidden");

    diceEl.src = `dice-${dice}.png`;

    //3. Provjeriti kockicu 1:ako  je true, prebaciti na sledeceg igraca

    if (dice !== 1) {
      // dodamo rezultat trenutnom skoru

      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // promjenimo na sledeceg igraca
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // 1. Dodavanje trenutnog scora aktivnom igracu
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Provjeri dali je skor >=100

    if (scores[activePlayer] >= 100) {
      // Zavrsi igru
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }

  //Promjeni na drugog igraca
});

btnNew.addEventListener("click", init);
