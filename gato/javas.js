let juugador1 = true;
let ceee = document.getElementsByClassName("cuadro");

for (let i = 0; i < ceee.length; i++) {
   ceee[i].addEventListener("click", jeje);
}

function jeje(e) {
   let valor = e.target.innerHTML;
   if (!valor.length) {
      e.target.innerHTML = juugador1 ? "x" : "o";
      juugador1 = !juugador1;

      checa(0, 1, 2);
      checa(3, 4, 5);
      checa(6, 7, 8);
      checa(0, 3, 6);
      checa(1, 4, 7);
      checa(2, 5, 8);
      checa(0, 4, 8);
      checa(6, 4, 2);
   }
}

function checa(c1, c2, c3) {
   if (
      ceee[c1].innerHTML.length &&
      ceee[c1].innerHTML == ceee[c2].innerHTML &&
      ceee[c2].innerHTML == ceee[c3].innerHTML
   ) {
      ganador(ceee[c1].innerHTML);
   }
}

function ganador(jugador) {
   document.querySelector("#resultado").innerHTML = jugador + " gano";
}