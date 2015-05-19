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
    (new Audio('sound/DtmfStar.ogg')).play();
    window.clearInterval(gametimer);
    document.querySelectorAll('.score')[gameType - 1].style.color = 'red';
  }
},100);

// starting the game
var startGame = function(type){
  gameType = type;
  document.getElementById('select-mode').style.display = 'none';
  var tableElement = document.getElementById('game-mode-'+gameType);
  tableElement.style.display = '';

  while (seed.length < 100){
    seed = seed + ((Math.random() * (gameType == 1 ? 3 : 8) + 1).toFixed());
  }
  startRound(0)
}

// starting the round
var startRound = function(index){
  var time = Math.min(300 - (round - 3) * 3, 200);
  setTimeout(function(){
    virtualHit(seed[index]);
    playAudio(seed[index], time);
    setTimeout(function(){
      virtualHitRemove(seed[index]);
      if (index < round-1){
        startRound(++index);
      } else {
        listen = true;
      }
    }, time);
  }, time);
}

// getting a value on the board
var getTableElement = function(number){
  return document.querySelectorAll('td[data-value="' + number + '"]')[number > 4 ? 0 : gameType-1];
}

// what happens when I click
var clickValue = function(value){
  if (listen) {
    timer = Math.min(100,timer + 5);
    playAudio(value);
    if (seed[++values] != value){
      timer = -10;
    } else if (values == round-1){
      round++;
      values = -1;
      listen = false;
      score = score + timer;
      document.querySelectorAll('.score')[gameType - 1].innerHTML = round - 3 + " : " + score;
      setTimeout(function(){
        startRound(0);
      },500);
    }
  }
}

var fullAudio = null;

// gotta have sound!
var playAudio = function(value, time){
  var time = time == undefined ? 250 : time;
  if (fullAudio == null){
    fullAudio = document.getElementById('audio');
  }
  fullAudio.pause();
  // var audio = document.getElementById('audio' + value);
  fullAudio.currentTime = (Number(value)-1);
  fullAudio.play();
  stopAudio(time);
}

// time to stop the audio
var stopAudio = function(time){
  setTimeout(function(){
    fullAudio.pause();
  }, time);
}

var keys = [
  false, false, false, false, false,
  false, false, false, false, false
];

var keydown = function(e){
  if (!keys[e.which - 96]){
    if (e.which >= 97 && e.which <= 105){
      virtualHit(e.which - 96);
      clickValue(e.which - 96);
      keys[e.which - 96] = true;
    }
  }
}

var keyup = function(e){
  if (e.which >= 97 && e.which <= 105){
    virtualHitRemove(e.which - 96);
    keys[e.which - 96] = false;
  }
}

var virtualHit = function(value){
  console.log(value)
  getTableElement(value).style.background = 'lightblue';
  getTableElement(value).style.fontSize = '120px';
}

var virtualHitRemove = function(value){
  getTableElement(value).style.background = '';
  getTableElement(value).style.fontSize = '';
}
