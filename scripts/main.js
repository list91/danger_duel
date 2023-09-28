import Enemy from './enemies/enemy.js';
import Player from './hero/hero.js'

const hero = new Player;
// title, bulletSpeed, oneShotCounts, maxBullets, rechargeSpeed, damage, radiusSpeed
const revolver = new Gun("Пистолет", 500, 1, 15, 10, [10, 20], 0.02);
const rifle = new Gun("Автомат", 100, 1, 32, 30, [5, 10], 0.1);
const shotgun = new Gun("Ружье", 500, 8, 3, 10, [20, 30], 0.5);

const hero = new Player(revolver);
const playerObject = hero.player;
const guns = [revolver, rifle, shotgun];

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