class Player {
  constructor(root) {
    this.x = Math.floor(Math.random() * 10) * PLAYER_WIDTH;
    const y = GAME_HEIGHT - PLAYER_HEIGHT -5;
    this.domElement = document.createElement('img');
    this.domElement.src = 'images/pumpkin_player.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y}px`;
    this.domElement.style.zIndex = '10';
    root.appendChild(this.domElement);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }
}
