const buttonAdd = document.querySelector("#user-add-game");
let j = 0;

buttonAdd.addEventListener("click", function (e) {
  getCheckedCheckBoxes();
});

// Удаление игрока из списка
function removeRow(id) {
  let description = document.getElementById(id);
  description.remove();
}

// Добавление игроков в список
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
      return `<tr id="${j + i + 1}">
            <td width="550px"><p class="pl">${checkboxesChecked[i]}</p></td>
            <td width="50px"><button class="remove" onClick="removeRow(${
              j + i + 1
            })" value="${j + i + 1}">✖</button></td>
        </tr>`;
    })
    .join("");
    j += checkboxesChecked.length;
}