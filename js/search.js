// Поиск игрока
document.querySelector('#search-players').oninput = function(){
    let val = this.value.trim();
    let elasticItems = document.querySelectorAll('.bd-player');
    if (val != ''){
        elasticItems.forEach(function(elem){
            if (elem.innerText.search(val) == -1){
                elem.classList.add('hide');
                elem.innerHTML = elem.innerHTML;
            }
            else {
                elem.classList.remove('hide');
            }
        });
    }
    else {
        elasticItems.forEach(function (elem){
            elem.classList.remove('hide');
        });
    }
}