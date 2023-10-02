import Enemy from './enemies/enemy.js';
import Bot from './enemies/testEnemy.js';
import Player from './hero/hero.js'
import Gun from './hero/gun.js';
import Data from './enemies/writerDataKeys.js';

// title, bulletSpeed, oneShotCounts, maxBullets, rechargeSpeed, damage, radiusSpeed
const revolver = new Gun("Пистолет", 500, 1, 15, 10, [10, 20], 0.02);
const rifle = new Gun("Автомат", 100, 1, 332, 30, [5, 10], 0.1);
const shotgun = new Gun("Ружье", 500, 8, 3, 10, [20, 30], 0.5);

const hero = new Player(rifle);
// hero.addEventListeners();
const playerObject = hero.player;
const guns = [revolver, rifle, shotgun];

let enemiesList = [];

///test
var data = new Data();
var blackList = new Data();
blackList.data = {};
for (let i = 0; i < 1; i++) {

    var enemy = new Bot(1220, 366);
    enemy.createEnemyBlockAndCheckBox(366, 1020);
    enemiesList.push(enemy);
    // hero.setEnemy(enemy);
  }


  
function update() {
    hero.move();
    
    for(let enemy of enemiesList){
        if (document.getElementsByClassName("bullet").length===0){
        // hero.fireAtEnemy(enemy.enemy);
        }
    }
    for(let enemy of enemiesList){
        const bullets = document.getElementsByClassName("bullet");
        for(let bullet of bullets){
            enemy.checkShot(bullet, hero, data, blackList);
            // document.getElementsByClassName("data_info")[0].innerText = JSON.stringify(data); 
        };
    }
    
    for (let platform of hero.platforms) {
        hero.handleCollisions(platform);
    }

    hero.updateBullets();
}

setInterval(update, 30);