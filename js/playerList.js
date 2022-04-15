let playersChecked = [];
let statistics = [];
let roundCounter = 0;

// Метод для определения счёта игрока
function scorePlayer(scoreOne, scoreTwo) {
  if (scoreOne - scoreTwo === 2 || scoreOne - scoreTwo === 1) {
    return 3;
  } else if (scoreOne - scoreTwo === 0) {
    return 1;
  } else return 0;
}

// Определение количества раундов
function round(len, RC) {
  return (len > 32 ? 6 : len > 16 ? 5 : len > 8 ? 4 : 3) !== RC;
}

// Создание нового тура или вывод результата
function par() {
  let players = document.getElementsByClassName("tur");
  for (let i = 0; i < players.length; i += 4) {
    playersChecked.unshift({
      fioPOne: players[i].innerHTML,
      fioPTwo: players[i + 1].innerHTML,
      firstPlayerScore: players[i + 2].value,
      secondPlayerScore: players[i + 3].value,
    });
  }

  if (!statistics.length) {
    for (let i = 0; i < playersChecked.length; i++) {
      statistics.unshift({
        fio: playersChecked[i].fioPOne,
        scoring: scorePlayer(
          playersChecked[i].firstPlayerScore,
          playersChecked[i].secondPlayerScore
        ),
      });
      statistics.unshift({
        fio: playersChecked[i].fioPTwo,
        scoring: scorePlayer(
          playersChecked[i].secondPlayerScore,
          playersChecked[i].firstPlayerScore
        ),
      });
    }
  } else {
    for (let i = 0; i < statistics.length / 2; i++) {
      for (let j = 0; j < statistics.length; j++) {
        if (playersChecked[i].fioPOne === statistics[j].fio) {
          statistics[j].scoring += scorePlayer(
            playersChecked[i].firstPlayerScore,
            playersChecked[i].secondPlayerScore
          );
        }
        if (playersChecked[i].fioPTwo === statistics[j].fio) {
          statistics[j].scoring += scorePlayer(
            playersChecked[i].secondPlayerScore,
            playersChecked[i].firstPlayerScore
          );
        }
      }
    }
  }

  statistics.sort((a, b) => (Number(a.scoring) < Number(b.scoring) ? 1 : -1));

  let pPlayers = [];
  let parPlayers = [];
  let playerOne;
  let item = -1;

  do {
    item++;
    while (
      statistics.length - 1 > item &&
      statistics[item].scoring === statistics[item + 1].scoring
    ) {
      pPlayers.push(statistics[item]);
      item++;
    }
    if (statistics[item] !== undefined) pPlayers.push(statistics[item]);

    if (pPlayers.length !== 1) {
      playerOne = pPlayers[0];
      let playerTwo = [];
      //Поиск второго игрока и вообще может он играть или нет
      for (let i = 1; i < pPlayers.length; i++) {
        for (let j = 0; j < playersChecked.length; j++) {
          if (
            (playerOne.fio == playersChecked[j].fioPOne &&
              pPlayers[i].fio == playersChecked[j].fioPTwo) ||
            (pPlayers[i].fio == playersChecked[j].fioPOne &&
              playerOne.fio == playersChecked[j].fioPTwo)
          ) {
            break;
          } else {
            if (
              !playerTwo.includes(pPlayers[i].fio) &&
              j === playersChecked.length - 1
            ) {
              playerTwo.push(pPlayers[i].fio);
            }
          }
        }
      }
      //Выбираем второго игрока рандомно
      if (playerTwo.length !== 0) {
        pPlayers.splice(0, 1);
        let j = Math.floor(Math.random() * playerTwo.length);
        parPlayers.push(playerOne.fio);
        parPlayers.push(playerTwo[j]);
        for (let i = 0; i < pPlayers.length; i++) {
          if (playerTwo[j] === pPlayers[i].fio) {
            pPlayers.splice(i, 1);
            break;
          }
        }
      }
    }
  } while (statistics.length > item);

  //Добавление таблицы с результатами или новыма парингами
  document.getElementById("par").remove();
  roundCounter++;
  let i = -1;
  if (round(parPlayers.length, roundCounter)) {
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
  } else {
    document.querySelector(".box-play").innerHTML +=
      `<div id="par">
    <table><tr>
    <th>№</th>
    <th>Игроки</th>
    <th>Счёт</th>
    </tr>` +
      statistics
        .map(() => {
          i += 1;
          return `<tr>
                <td width="50px">${i + 1}</td>
                <td width="540px"><p class="tur">${statistics[i].fio}</p></td>
                <td width="70px" align="center">${statistics[i].scoring}</td>
            </tr>`;
        })
        .join("") +
      `</table>`;
  }
}
