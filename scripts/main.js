// import Enemy from './enemies/enemy.js';
// import Bot from './enemies/testEnemy.js';
import Player from './hero/hero.js'
import Gun from './hero/gun.js';
import Data from './enemies/writerDataKeys.js';
import Zombie from './enemies/zombie.js';
import Enemy from './enemies/enemy.js';

// title, bulletSpeed, oneShotCounts, maxBullets, rechargeSpeed, damage, radiusSpeed
const revolver = new Gun("Пистолет", 500, 1, 15, 10, [10, 20], 0.02);
const rifle = new Gun("Автомат", 100, 1, 32, 30, [5, 10], 0.1);
const shotgun = new Gun("Ружье", 500, 8, 8, 10, [20, 30], 0.5);

const guns = [revolver, rifle, shotgun];
const hero = new Player(guns);
const playerObject = hero.player;

let enemiesList = [];

// for (let i = 0; i < 1; i++) {

//     var enemy = new Zombie(1220, Math.random() * 606 - 100);
//     enemy.createEnemyBlock(1220, Math.random() * 606 - 200);
//     enemiesList.push(enemy);
//   }

function update() {

    for(let enemy of enemiesList){
        hero.checkCollisionsEnemy(enemy);
    }
    hero.move();
    
    for(let enemy of enemiesList){
        hero.checkCollisionsEnemy(enemy);
        enemy.runActionToPlayer(playerObject);
    }
    for(let enemy of enemiesList){
        const bullets = document.getElementsByClassName("bullet");
        for(let bullet of bullets){
            enemy.checkDamage(bullet, hero.getDamage());
        };
    }
    // if(document.getElementsByClassName("enemy").length<3){
    //     var enemy = new Zombie(1220, Math.random() * 606 - 100);
    //     enemy.createEnemyBlock(1220, Math.random() * 606 - 200);
    //     enemiesList.push(enemy);
    // }
    
    for (let platform of hero.platforms) {
        hero.handleCollisions(platform);
    }

    hero.updateBullets();
}

setInterval(update, 30);