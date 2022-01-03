const buttonAdd = document.querySelector("#user-add-game");
const draft = document.querySelector("#draft");

buttonAdd.addEventListener("click", function (e) {
  getCheckedCheckBoxes();
});

draft.addEventListener("click", function (e) {
  createPlay();
});

//Добавление игроков в список
function getCheckedCheckBoxes() {
  let checkboxes = document.getElementsByClassName("checkbox");
  let checkboxesChecked = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i].value);
    }
  }
  let i = -1;
  document.querySelector(".test").innerHTML += checkboxesChecked
    .map(() => {
      i++;
      return `<tr id="${i + 1}">
            <td width="50px">${i + 1}</td>
            <td width="550px"><p class="pl">${checkboxesChecked[i]}</p></td>
            <td width="50px"><button class="remove" onClick="removeRow(${
              i + 1
            })" value="${i + 1}">✖</button></td>
        </tr>`;
    })
    .join("");
}

//Удаление объекта
function removeRow(id) {
  let description = document.getElementById(id);
  description.remove();
}

function par() {
  let players = document.getElementsByClassName("tur");
  let playersChecked = [];
  for (let i = 0; i < players.length; i+=4) {
    playersChecked[i/4] = {
      fioPOne: players[i].innerHTML,
      fioPTwo: players[i + 1].innerHTML,
      RP: players[i + 2].value + players[i + 3].value,
    };
  }
  console.log(playersChecked);
  let statistics = [];
  for(let i = 0; i < playersChecked.length; i++){
    statistics.push({
      fio: playersChecked[i].fioPOne,
      scoring: playersChecked[i].RP === '20'|| playersChecked[i].RP === '21' || playersChecked[i].RP === '10'?'3':playersChecked[i].RP === '00'|| playersChecked[i].RP === '11'?'1':'0',
    });
    statistics.push({
      fio: playersChecked[i].fioPTwo,
      scoring: playersChecked[i].RP === '02'|| playersChecked[i].RP === '12' || playersChecked[i].RP === '01'?'3':playersChecked[i].RP === '00'|| playersChecked[i].RP === '11'?'1':'0',
    });
  }
  statistics.sort((a, b) => Number(a.scoring) < Number(b.scoring) ? 1 : -1);
  console.log(statistics);
}

//Создание игры
function createPlay() {
  let players = document.getElementsByClassName("pl");
  let playersChecked = [];
  for (let i = 0; i < players.length; i++) {
    playersChecked.push(players[i].innerHTML);
  }

  if (playersChecked.length % 2 !== 0) playersChecked.push("Бай");

  let parPlayers = [];
  playersChecked.sort(() => Math.random() - 0.5);
  console.log(playersChecked);
  while (playersChecked.length !== 0) {
    let j = Math.floor(Math.random() * playersChecked.length);
    parPlayers.push(playersChecked[j]);
    playersChecked.splice(j, 1);
  }
  console.log(parPlayers);
  let i = -1;
  document.querySelector(".box-play").innerHTML +=
    `<table><tr>
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
    `<button class="btm-par" onClick="par()">Паринги следующего тура</button>`;
}
