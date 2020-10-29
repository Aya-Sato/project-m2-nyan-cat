class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.candies = [];
    this.specialcandies = [];
    this.count = 0;
    addBackground(this.root);
  }

  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    
    this.enemies.forEach((enemy) => {
      if (levelNum.innerHTML === '1') {
        enemy.update(timeDiff, 1);
      }
      else if (levelNum.innerHTML === '2') {
        enemy.update(timeDiff, 1.25);
      }
      else if (levelNum.innerHTML === '3') {
        enemy.update(timeDiff, 1.5);
      }
    });

    this.candies.forEach((candy) => {
      if (levelNum.innerHTML === '1' || levelNum.innerHTML === '2') {
        candy.updateCandy(timeDiff, 1);
      }
      else if (levelNum.innerHTML === '3') {
        candy.updateCandy(timeDiff, 1.25);
      }
    });
    this.specialcandies.forEach((specialcandy) => {
      specialcandy.updateSpecialCandy(timeDiff);
    });

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    this.candies = this.candies.filter((candy) => {
      return !candy.destroyed;
    });
    this.specialcandies = this.specialcandies.filter((specialcandy) => {
      return !specialcandy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemyCandySpot(this.enemies, this.candies, this.specialcandies);
      const newEnemy = new Enemy(this.root, spot);
      this.enemies.push(newEnemy);
    }

    while (this.candies.length < MAX_CANDIES) {
      const spot1 = nextEnemyCandySpot(this.enemies, this.candies, this.specialcandies);
      this.candies.push(new Candy(this.root, spot1));
    }

    if (levelNum.innerHTML === '3') {
      setTimeout(() => {
      while (this.specialcandies.length < MAX_CANDIES_LEVEL3) {
          const spot2 = nextEnemyCandySpot(this.enemies, this.candies, this.specialcandies);
          this.specialcandies.push(new CandyRed(this.root, spot2));
        }
      }, 2000);
    }

    if (this.isPlayerDead()) {
      ghostbusters.pause();
      document.removeEventListener('keydown', keydownHandler);
      setTimeout(() => {
        const gameOverText = document.querySelector('.game-over-text');
        gameOverText.style.display = 'block';
        const gameOverVoice = document.getElementById('gameover');
        gameOverVoice.play();
      }, 1000);
      setTimeout(() => {
        const rematchBtn = document.querySelector('.game-over-btn');
        rematchBtn.style.display = 'block';
        rematchBtn.addEventListener('click', function() {
          location.reload();
        });
      }, 3500);
      return;
    }
    setTimeout(this.gameLoop, 20);
  };

  isPlayerDead = () => {
    const enemy = this.enemies.find((enemy) => {
      if (enemy.x === this.player.x && enemy.y + ENEMY_HEIGHT >= GAME_HEIGHT - PLAYER_HEIGHT) {
        return true;
      }
      else {
        return false;
      }
    })
    return enemy;
  };

  addPointLevelOne = () => {
    this.candies.find((candy) => {
      if (candy.x === this.player.x && candy.y + BONUS_HEIGHT > GAME_HEIGHT + 80) {
          this.count = this.count + 10;
        let score = document.querySelector('.score');
        score.innerHTML = this.count;
        candy.destroyed = true;
        const getPointSound = document.getElementById('get-point');
        getPointSound.play();
      }})
      setTimeout(this.addPointLevelOne, 20);
    }
  
  addPointLevelTwo = () => {
    this.candies.find((candy) => {
        if (candy.x === this.player.x && candy.y + BONUS_HEIGHT > GAME_HEIGHT + 80) {
          this.count = this.count + 25;
          let score = document.querySelector('.score');
          score.innerHTML = this.count;
          candy.destroyed = true;
          const getPointSound = document.getElementById('get-point');
          getPointSound.play();
        }})
    setTimeout(this.addPointLevelTwo, 20);
  }

  addPointLevelThree = () => {
    const getPointSound = document.getElementById('get-point');
    this.candies.find((candy) => {
      if (candy.x === this.player.x && candy.y + BONUS_HEIGHT > GAME_HEIGHT + 80) {
        this.count = this.count + 50;
        candy.destroyed = true;
        getPointSound.play();
      }})
    this.specialcandies.find((specialcandy) => {
      if (specialcandy.x === this.player.x && specialcandy.y + BONUS_HEIGHT > GAME_HEIGHT + 80) {
        this.count = this.count + 150;
        specialcandy.destroyed = true;
        getPointSound.play();
    }})
    let score = document.querySelector('.score');
    score.innerHTML = this.count;
  setTimeout(this.addPointLevelThree, 20);
  }
}
