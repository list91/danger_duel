import Player from './hero/hero.js'

const hero = new Player;
const playerObject = hero.player;
// platforms
function update() {
    // move();
    hero.move();

    let ySpeed = hero.ySpeed;
    let gravity = hero.gravity;
    ySpeed += gravity;
    
    playerObject.style.top = (parseInt(window.getComputedStyle(playerObject).getPropertyValue("top")) + ySpeed) + "px";
    
    for (let platform of hero.platforms) {
        hero.handleCollisions(platform);
    }

    hero.updateBullets();
}

setInterval(update, 30);