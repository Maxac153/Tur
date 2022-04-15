const draft = document.querySelector("#draft");

draft.addEventListener("click", function (e) {
  createPlay();
});

// Создание игры
function createPlay() {
  let players = document.getElementsByClassName("pl");

  for (let i = 0; i < players.length; i++) {
    playersChecked.push(players[i].innerHTML);
  }

  if (playersChecked.length % 2 !== 0) playersChecked.push("Бай");

  let parPlayers = [];
  playersChecked.sort(() => Math.random() - 0.5);
  while (playersChecked.length !== 0) {
    let j = Math.floor(Math.random() * playersChecked.length);
    parPlayers.push(playersChecked[j]);
    playersChecked.splice(j, 1);
  }
  let i = -1;
  document.querySelector(".box-play").innerHTML +=
    `<div id="par">
      <table><tr>
      <th>№</th>
      <th colspan="2">Игроки</th>
      <th>Счёт</th>
    </tr>` +
    parPlayers
      .map(() => {
        i += 1;
        if (i % 2 === 0)
          return `<tr>
                  <td width="50px">${i / 2 + 1}</td>
                  <td width="270px"><p class="tur">${parPlayers[i]}</p></td>
                  <td width="270px"><p class="tur">${parPlayers[i + 1]}</p></td>
                  <td width="70px"><input id="player-one" class="tur"></input><input id="player-two" class="tur"></input></td>
              </tr>`;
      })
      .join("") +
    `</table>` +
    `<button class="btm-par" onClick="par()">Паринги следующего тура</button></div>`;
}
