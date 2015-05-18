var round = 3;
var seed = '';
var values = -1;
var gameover = false;
var listen = false;
var timer = 100;
var gameType = 0;
var score = 0;

var gametimer = setInterval(function(){
  if (listen) {
    timer--;
    document.querySelectorAll('.time')[gameType - 1].style.width = timer + "%";
    if (timer < 0){
      gameover = true;
      listen = false;
    }
  }
  if (gameover){
    document.getElementById('audioOver').play();
    window.clearInterval(gametimer);
  }
},100);

// starting the game
var startGame = function(type){
  gameType = type;
  document.getElementById('select-mode').style.display = 'none';
  var tableElement = document.getElementById('game-mode-'+type);
  tableElement.style.display = '';

  while (seed.length < 100){
    seed = seed + ((Math.random() * (type == 1 ? 3 : 8) + 1).toFixed());
  }
  console.log(seed)
  startRound(type, 0)
}

var startRound = function(type, index){
  var time = 300;
  setTimeout(function(){
    var ele = getTableElement(type, seed[index]);
    ele.style.background = 'lightblue';
    ele.style.fontSize = '150px';
    playAudio(seed[index]);
    setTimeout(function(){
      var ele = getTableElement(type, seed[index]);
      ele.style.background = '';
      ele.style.fontSize = '';
      if (index < round-1){
        startRound(type, ++index);
      } else {
        listen = true;
      }
    }, time);
  }, time);
}

var getTableElement = function(type,number){
  return document.querySelectorAll('td[data-value="' + number + '"]')[number > 4 ? 0 : type-1];
}

var clickValue = function(e, type){
  var target = e.target || event.srcElement;
  if (listen) {
    timer = Math.min(100,timer + 5);
    playAudio(target.getAttribute('data-value'));
    if (seed[++values] != target.getAttribute('data-value')){
      timer = -10;
    }
    console.log(values == round)
    if (values == round-1){
      round++;
      values = -1;
      listen = false;
      score = score + timer;
      document.querySelectorAll('.score')[gameType - 1].innerHTML = round - 3 + " : " + score;
      setTimeout(function(){
        startRound(type, 0);
      },500);
    }
  }
}

var playAudio = function(value){
  var audio = document.getElementById('audio' + value);
  audio.play();
  stopAudio(audio);
}

var stopAudio = function(audio){
  setTimeout(function(){
    audio.pause();
    audio.currentTime = 0;
  }, 300);
}
