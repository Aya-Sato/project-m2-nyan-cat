class Candy {
    constructor(theRoot, candySpot) {
        this.root = theRoot;
        this.spot = candySpot;
        this.x = candySpot * BONUS_WIDTH;
        this.y = -BONUS_HEIGHT;
        this.destroyed = false;
        this.domElement = document.createElement('img');
        this.domElement.src = './images/candy_purple.png';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = `${this.y}px`;
        this.domElement.style.zIndex = 5;
        theRoot.appendChild(this.domElement);
        this.speed = Math.random() / 2 + 0.25;
    }
    
    updateCandy(timeDiff, speed) {
        this.y = this.y + timeDiff * this.speed * speed;
        this.domElement.style.top = `${this.y}px`;
        
        if (this.y > GAME_HEIGHT) {
        this.root.removeChild(this.domElement);
        this.destroyed = true;
        }
    }
}