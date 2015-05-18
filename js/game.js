var round = 30;
var seed = '';
var values = [];

// getting 100 numbers that aren't 0, making that the seed
while (seed.length < 100) { seed = seed + (Math.random()*10+'').split('.').join('')}

// starting the game
var startGame = function(type){
  document.getElementById('select-mode').style.display = 'none';
  var tableElement = document.getElementById('game-mode-'+type);
  tableElement.style.display = '';

  selectElement(type, seed, 0)

}

var selectElement = function(type, values, index){
  var time = 50000 / values.length;
  setTimeout(function(){
    var ele = getTableElement(type, values[index]);
    ele.style.background = 'lightblue';
    ele.style.textShadow = '0px 0px 0px black';
    setTimeout(function(){
      var ele = getTableElement(type, values[index]);
      ele.style.background = '';
      ele.style.textShadow = '';
      if (0 < round){
        console.log(round--);
        selectElement(type, values, ++index);
      }
    }, time);
  }, (time) * index);
}

var getTableElement = function(type,number){
  number = type == 1 ? Math.round(number / 3) : number;
  number = type == 1 ? number : Number(number) + 3;
  return document.getElementsByTagName('td')[number];
}
