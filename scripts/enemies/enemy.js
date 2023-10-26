export default class Enemy {
    constructor(x, y) {
        this.hpMax = 100;
        this.HP = this.hpMax;
        this.xPos = x;
        this.yPos = y;
        this.speedEnemy = 4;
        this.damage = 4;
        
        // после вызова этого метода в поле enemy находится созданный объект 
        var top = y;//Math.floor(Math.random() * 1000);
        var left = x;//Math.floor(Math.random() * 1000);
        
        this.platforms = document.getElementsByClassName("platform");
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.isRight = false;
        this.isLeft = false;
        this.isUp = false;
        this.isDown = false;
        this.currentXSpeed = this.xSpeed;
        

    }
    getDamage(){return this.damage}
    killEnemy(){
        if (document.contains(this.enemy)) {
            this.enemy.style.display = "none";
            this.enemyBar.style.display = "none";
            document.body.removeChild(this.enemy);
            document.body.removeChild(this.enemyBar);
        }
    }
    setDamageHP(damage) {
        //  this.HP = this.getHpCountsForLabel();
        if(this.HP<damage){
            this.killEnemy();
        }else{
            this.HP = this.HP-damage;
            this.hpBar.style.width = this.getHpCountsSiseForSyle()+"px";
            // alert(this.getHpCountsSiseForSyle()+"px");

        }

        // console.log();
    }
    getHpCountsSiseForSyle(){
        var hpCountsProc = this.HP/this.hpMax*100;
        // alert(this.hpMaxSise);
        return this.hpMaxSise*hpCountsProc/100;
    }
    getHpCountsForLabel(){
        //имеющиеся на максимальные и *100 это в процентах сколько сейчас
        var hpSise = this.hpBar.style.width;
        var hpPixelProc = hpSise/this.hpMaxSise*100;

        //максимальное число умнажаем на желаемы процент и делим на 100
        return this.hpMax*hpPixelProc/100;
    }
    checkDamage(bullet, damage) {
        const enemyRect = this.enemy.getBoundingClientRect();
        const bulletRect = bullet.getBoundingClientRect();

        if (
            bulletRect.bottom >= enemyRect.top &&
            bulletRect.top <= enemyRect.bottom &&
            bulletRect.right >= enemyRect.left &&
            bulletRect.left <= enemyRect.right
        ) {
            // console.log(Math.floor(Math.random() * (damage[1] - damage[0] + 1)) + damage[0]);
            this.setDamageHP(Math.floor(Math.random() * (damage[1] - damage[0] + 1)) + damage[0]);
            bullet.style.display = "none";
            // this.hpBar.style.backgroundColor = "rgb(0 0 255)";
        }
    }

    runActionToPlayer(player){
        const enemyLeft = this.enemy.offsetLeft;
        const enemyTop = this.enemy.offsetTop;
        const playerLeft = player.offsetLeft;
        const olayerTop = player.offsetTop;
      
        const distanceX = playerLeft - enemyLeft;
        const distanceY = olayerTop - enemyTop;
      
        // Math.sqrt();
        var p = Math.sqrt((playerLeft - enemyLeft)**2 + (olayerTop - enemyTop)**2)/this.speedEnemy
        var left = enemyLeft + distanceX / p;
        var top = enemyTop + distanceY / p;
        this.enemy.style.left = left + 'px';
        this.enemy.style.top = top + 'px';

        this.enemyBar.style.left = left-5 + 'px';
        this.enemyBar.style.top = top-24 + 'px';
        this.xPos = left;
        this.yPos = top;
        // console.log(distanceX);
    }
    createHpBar(top, left){
        // this.enemy = document.getElementById("player");
        this.enemyBar = document.createElement("div");
        this.enemyBar.setAttribute("class", "enemy_bar");
        this.enemyBar.style.width = "60px";
        this.enemyBar.style.height = "18px";
        this.enemyBar.style.position = "absolute";
        this.enemyBar.style.top = top-24 + "px";
        this.enemyBar.style.left = left-5 + "px";
        this.hpBar = document.createElement("div");
        this.hpBar.setAttribute("class", "enemy_hp_bar");
        this.hpBar.style.backgroundColor = "rgb(255 0 0)";
        this.hpBar.style.width = "50px";
        this.hpBar.style.height = "7px";
        this.hpBar.style.margin = "5px";
        // this.hpBar.style.position = "absolute";
        this.hpBar.style.top = top + "px";
        this.hpBar.style.left = left + "px";
        this.setStartPositionXY(top, left);
        this.enemyBar.appendChild(this.hpBar);
        document.body.appendChild(this.enemyBar);
        // document.this
        // document.body.appendChild(this.hpBar);
    }
    
    createEnemyBlock(left, top){
        // this.enemy = document.getElementById("player");
        this.enemy = document.createElement("div");
        this.enemy.setAttribute("class", "enemy");
        this.enemy.style.backgroundColor = "rgb(0 255 0)";
        this.enemy.style.width = "50px";
        this.enemy.style.height = "50px";
        this.enemy.style.position = "absolute";
        this.enemy.style.top = top + "px";
        this.enemy.style.left = left + "px";
        document.body.appendChild(this.enemy);
        this.setStartPositionXY(top, left);
        this.createHpBar(top-30, left);
        this.hpMaxSise = parseInt(this.hpBar.style.width);
    }

    setStartPositionXY(top, left) {
        this.enemy.style.left = left + "px";
        this.enemy.style.top = top + "px";
    }

    move() {
        if (this.isRight && this.isDown) {
            this.moveRight();
            this.moveDown();
        } else if (this.isLeft && this.isDown) {
            this.moveLeft();
            this.moveDown();
        } else if (this.isLeft && this.isUp) {
            this.moveLeft();
            this.moveUp();
        } else if (this.isRight && this.isUp) {
            this.moveRight();
            this.moveUp();
        } else if (this.isDown) {
            this.moveDown();
        } else if (this.isLeft) {
            this.moveLeft();
        } else if (this.isRight) {
            this.moveRight();
        } else if (this.isUp) {
            this.moveUp();
        }
    }

    moveLeft() {
        this.xPos -= this.speedEnemy;
        this.enemy.style.left = this.xPos + "px";
    }

    moveRight() {
        this.xPos += this.speedEnemy;
        this.enemy.style.left = this.xPos + "px";
    }

    moveUp() {
        this.yPos -= this.speedEnemy;
        this.enemy.style.top = this.yPos + "px";
    }

    moveDown() {
        this.yPos += this.speedEnemy;
        this.enemy.style.top = this.yPos + "px";
    }

    handleCollisions(platform) {
        let playerRect = this.player.getBoundingClientRect();
        let platformRect = platform.getBoundingClientRect();
        let inventoryRect = this.inventory.getBoundingClientRect();
        let bullets = document.getElementsByClassName("bullet");
        for(let bullet of bullets){
            
            let bulletRect = bullet.getBoundingClientRect();
            // console.log(bullet.style.bottom);
            
            if(bulletRect.bottom >= platformRect.top &&
                bulletRect.top <= platformRect.bottom &&
                bulletRect.right >= platformRect.left &&
                bulletRect.left <= platformRect.right
                ){
                    // console.log(bullet.style.x, bullet.style.y);
                    
                    this.createCollisionBlock(bulletRect.left, bulletRect.top);
                    bullet.style.display = "none";
                    // bullet.style.top = this.yPos + "px"; 
            }
        }

        this.inventory.style.top =
            playerRect.top - inventoryRect.height + "px";

        if (
            playerRect.bottom >= platformRect.top &&
            playerRect.top <= platformRect.bottom &&
            playerRect.right >= platformRect.left &&
            playerRect.left <= platformRect.right
        ) {
            if (
                playerRect.bottom >= platformRect.top &&
                playerRect.bottom <= platformRect.top + this.ySpeed
            ) {
                this.yPos = platformRect.top - playerRect.height;
                this.player.style.top = this.yPos + "px";
            }
        }
    }

    update() {
        this.move();

        for (let platform of this.platforms) {
            this.handleCollisions(platform);
        }

        this.updateBullets();
    }

    distanceBetweenPoints(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }

}