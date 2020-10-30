const gameEngine = new Engine(document.getElementById('app'));
const body = document.querySelector('body');

const startBtn = document.querySelector('.startbtn');
const startMessage = document.querySelector('.start');
const ghostbusters = document.getElementById('ghostbusters');
const witchLaugh = document.getElementById('witch-laugh');
const gameEnding = document.getElementById('game-ending');

let levelNum = document.querySelector('.levelnum');
levelNum.innerHTML = 1;
let score = document.querySelector('.score');
let purpleCandyPoint = document.querySelector('.purple-pt');
let redCandyImage = document.querySelector('.red-candy');
let redCandyPoint = document.querySelector('.red');

const nextLevel = document.querySelector('.next-level');
nextLevel.style.display = 'none';
const LevelTwoBtn = document.getElementById('level2btn');
const LevelThreeBtn = document.getElementById('level3btn');

const endgameMessage = document.querySelector('.end-game');
endgameMessage.style.display = 'none';
endgamePoint = document.querySelector('.total-pt');
const endgameReplayBtn = document.querySelector('.replaybtn');

const keydownHandler = (event) => {
  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }
  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }
};

document.addEventListener('keydown', keydownHandler);

const gameStartHandler = (event) => {
  startMessage.style.display = 'none';
  ghostbusters.play();
  ghostbusters.volume = 0.5;
  gameEngine.addPointLevelOne();
  setTimeout(() => {
    gameEngine.gameLoop();
    countdown(1, 30); 
  }, 1500);
}

function fadeAudioGhostbusters() {
  let fadeAudio = setInterval(function () {
      if (ghostbusters.volume != 0.0) {
          ghostbusters.volume = Math.max(0, ghostbusters.volume - 0.1);
      }
      else if (ghostbusters.volume === 0.0) {
          clearInterval(fadeAudio);
      }
  }, 200);
}

let timer = document.getElementById('timer');
function countdown(minutes, seconds) {
  timer.innerHTML = minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
  const counter = setInterval(() => {
    if (seconds > 0) {
      seconds = seconds - 1;
      timer.innerHTML = minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
    } 
    else if (seconds === 0 && minutes !== 0) {
      minutes = minutes - 1;
      seconds = 59;
      timer.innerHTML = minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
    }
    if (seconds === 1 && minutes === 0 && !gameEngine.isPlayerDead()) {
      MAX_ENEMIES = 0;
      MAX_CANDIES = 0;
    }
    else if (seconds === 0 && minutes === 0 && !gameEngine.isPlayerDead()) {
      clearInterval(counter);
      fadeAudioGhostbusters();
      if (levelNum.innerHTML === '1') {
        setTimeout(() => {
          nextLevel.style.display = 'block';
          level3btn.style.display = 'none';
          witchLaugh.play();
          witchLaugh.volume = 0.4;
        }, 4000);
      }
      else if (levelNum.innerHTML === '2') {
        setTimeout(() => {
          nextLevel.style.display = 'block';
          level3btn.style.display = 'inline-block';
          level2btn.style.display = 'none';
          witchLaugh.play();
          witchLaugh.volume = 0.4;
        }, 4000);
      }
      else if (levelNum.innerHTML === '3') {
        MAX_CANDIES_LEVEL3 = 0;
        setTimeout(() => {
          gameEnding.play();
          endgameMessage.style.display = 'block';
          endgamePoint.innerHTML = gameEngine.count;
          endgamePoint.style.color = 'rgb(116, 1, 178)';
          endgameReplayBtn.style.display = 'inline-block';
          endgameReplayBtn.addEventListener('click', function() {
          location.reload();
          })
        }, 4000);
      }
    }
    if (gameEngine.isPlayerDead()) { 
      clearInterval(counter); 
    }
  }, 1000)
}

startBtn.addEventListener('click', gameStartHandler);

function startLevelTwoHandler() {
  gameEngine.addPointLevelOne = function() {};
  nextLevel.style.display = 'none';
  levelNum.innerHTML = 2;
  ghostbusters.play();
  ghostbusters.volume = 0.5;
  gameEngine.addPointLevelTwo();
  purpleCandyPoint.innerHTML = 25;
  setTimeout(() => {
    gameEngine.gameLoop();
    countdown(1, 30); 
    MAX_ENEMIES = 4;
    MAX_CANDIES = 2;
  }, 1500);
}

LevelTwoBtn.addEventListener('click', startLevelTwoHandler);

function startLevelThreeHandler() {
  gameEngine.addPointLevelTwo = function() {};
  nextLevel.style.display = 'none';
  levelNum.innerHTML = 3;
  ghostbusters.play();
  ghostbusters.volume = 0.5;
  gameEngine.addPointLevelThree();
  purpleCandyPoint.innerHTML = 50;
  redCandyImage.style.visibility = 'visible';
  redCandyPoint.style.visibility = 'visible';
  setTimeout(() => {
    gameEngine.gameLoop();
    countdown(1, 0);
    MAX_ENEMIES = 5;
    MAX_CANDIES = 1;
  }, 1500);
}

LevelThreeBtn.addEventListener('click', startLevelThreeHandler);
