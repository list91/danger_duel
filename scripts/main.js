import Enemy from './enemies/enemy.js';
import Bot from './enemies/testEnemy.js';
import Player from './hero/hero.js'
import Gun from './hero/gun.js';
import Data from './enemies/writerDataKeys.js';

// title, bulletSpeed, oneShotCounts, maxBullets, rechargeSpeed, damage, radiusSpeed
const revolver = new Gun("Пистолет", 500, 1, 15, 10, [10, 20], 0.02);
const rifle = new Gun("Автомат", 100, 1, 32, 30, [5, 10], 0.1);
const shotgun = new Gun("Ружье", 500, 8, 3, 10, [20, 30], 0.5);

const hero = new Player(revolver);
const playerObject = hero.player;
const guns = [revolver, rifle, shotgun];

let enemiesList = [];

///test
var data = new Data("data.json");
// data.set(45, {LS: 15, AS: 30});
// data.set(44, {LS: 55, AS: 32});
// console.log(data.get(45)); // Выведет: {LS: 15, AS: 30}
// data.set(45, {LS: 25, AS: 10});
// console.log(data.get(45)); // Выведет: {LS: 25, AS: 10}
for (let i = 0; i < 1; i++) {

    var enemy = new Bot(1220, 366);
    enemy.createEnemyBlockAndCheckBox(366, 1020);
    // enemy.createCheckLine(366, 1220);
    enemiesList.push(enemy);
  }



// setInterval(function(){
//     for(let enemy of enemiesList){
//         hero.checkCollisionsEnemy(enemy);
//     }
// }, 500)

function update() {
    hero.move();
    
    for(let enemy of enemiesList){
        // console.log(enemy.xPos);
        // enemy.updateLine(hero);
        // enemy.runActionToPlayer(playerObject);
        const bullets = document.getElementsByClassName("bullet");
        for(let bullet of bullets){
            enemy.checkShot(bullet, hero, data);
            console.log(data.getData());
            // enemy.checkDamage(bullet, hero.getDamage());
            // enemy.run();
        };
    }
    
    for (let platform of hero.platforms) {
        hero.handleCollisions(platform);
    }

    hero.updateBullets();
}

setInterval(update, 30);