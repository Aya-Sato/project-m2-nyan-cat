const nextEnemyCandySpot = (enemies, candies, specialcandies) => {
  const enemyCandySpots = GAME_WIDTH / ENEMY_WIDTH;
  const spotsTaken = [false, false, false, false, false, false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });
  candies.forEach((candy) => {
    spotsTaken[candy.spot] = true;
  });
  specialcandies.forEach((specialcandy) => {
    spotsTaken[specialcandy.spot] = true;
  });

  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    candidate = Math.floor(Math.random() * enemyCandySpots);
  }
  return candidate;
};

const addBackground = (root) => {
  const bg = document.createElement('img');
  bg.src = 'images/spooky_background.png';
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;
  root.append(bg);
  
  const darkBox = document.createElement('div');
  darkBox.style.zIndex = 100;
  darkBox.style.position = 'absolute';
  darkBox.style.top = `${GAME_HEIGHT}px`;
  darkBox.style.height = `${ENEMY_HEIGHT}px`;
  darkBox.style.width = `${GAME_WIDTH}px`;
  darkBox.style.background = 'rgb(2, 2, 19)';
  root.append(darkBox);
};
