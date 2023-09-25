import Enemy from './enemies/enemy.js';
import Player from './hero/hero.js'

const hero = new Player;
const playerObject = hero.player;

const enemy1 = new Enemy(100, 100);
const enemy2 = new Enemy(100, 100);
// platforms
function update() {
    // enemy.moveRight();
    // enemy.runActionToPlayer(playerObject);
    // move();
    hero.move();


    const bullets = document.getElementsByClassName("bullet");
    for(let bullet of bullets){
        enemy1.checkDamage(bullet);
    }
    
    // console.log(hero.bullets);

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