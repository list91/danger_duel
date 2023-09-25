export default class Enemy {
    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.speedPlayer = 5;

        // после вызова этого метода в поле enemy находится созданный объект 
        var top = Math.floor(Math.random() * 1000);
        var left = Math.floor(Math.random() * 1000);
        console.log(top);
        console.log(left);
        this.createEnemyBlock(top, left);

        this.createHpBar(top-30, left);
        
        this.platforms = document.getElementsByClassName("platform");
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.isRight = false;
        this.isLeft = false;
        this.isUp = false;
        this.isDown = false;
        this.currentXSpeed = this.xSpeed;

        // this.moveRight();
    }
    checkDamage(bullet) {
        const enemyRect = this.enemy.getBoundingClientRect();
        const bulletRect = bullet.getBoundingClientRect();

        if (
            bulletRect.bottom >= enemyRect.top &&
            bulletRect.top <= enemyRect.bottom &&
            bulletRect.right >= enemyRect.left &&
            bulletRect.left <= enemyRect.right
        ) {
            this.hpBar.style.backgroundColor = "rgb(0 0 255)";
        }
    }

    runActionToPlayer(player){
        const enemyLeft = this.enemy.offsetLeft;
        const enemyTop = this.enemy.offsetTop;
        const playerLeft = player.offsetLeft;
        const olayerTop = player.offsetTop;
      
        const distanceX = playerLeft - enemyLeft;
        const distanceY = olayerTop - enemyTop;
      
        this.enemy.style.left = (enemyLeft + distanceX / 100) + 'px';
        this.enemy.style.top = (enemyTop + distanceY / 100) + 'px';
        console.log(distanceX);
    }

    createHpBar(top, left){
        // this.enemy = document.getElementById("player");
        this.hpBar = document.createElement("div");
        this.hpBar.setAttribute("class", "enemy");
        this.hpBar.style.backgroundColor = "rgb(255 0 0)";
        this.hpBar.style.width = "100px";
        this.hpBar.style.height = "20px";
        this.hpBar.style.position = "absolute";
        this.hpBar.style.top = top + "px";
        this.hpBar.style.left = left + "px";
        this.setStartPositionXY(top, left);
        document.body.appendChild(this.hpBar);
    }
    
    createEnemyBlock(top, left){
        // this.enemy = document.getElementById("player");
        this.enemy = document.createElement("div");
        this.enemy.setAttribute("class", "enemy");
        this.enemy.style.backgroundColor = "rgb(0 255 0)";
        this.enemy.style.width = "50px";
        this.enemy.style.height = "50px";
        this.enemy.style.position = "absolute";
        this.enemy.style.top = top + "px";
        this.enemy.style.left = left + "px";
        this.setStartPositionXY(top, left);
        document.body.appendChild(this.enemy);
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
        this.xPos -= this.speedPlayer;
        this.enemy.style.left = this.xPos + "px";
    }

    moveRight() {
        this.xPos += this.speedPlayer;
        this.enemy.style.left = this.xPos + "px";
    }

    moveUp() {
        this.yPos -= this.speedPlayer;
        this.enemy.style.top = this.yPos + "px";
    }

    moveDown() {
        this.yPos += this.speedPlayer;
        this.enemy.style.top = this.yPos + "px";
    }

    handleCollisions(platform) {
        let playerRect = this.player.getBoundingClientRect();
        let platformRect = platform.getBoundingClientRect();
        let inventoryRect = this.inventory.getBoundingClientRect();
        let bullets = document.getElementsByClassName("bullet");
        for(let bullet of bullets){
            
            let bulletRect = bullet.getBoundingClientRect();
            console.log(bullet.style.bottom);
            
            if(bulletRect.bottom >= platformRect.top &&
                bulletRect.top <= platformRect.bottom &&
                bulletRect.right >= platformRect.left &&
                bulletRect.left <= platformRect.right
                ){
                    console.log(bullet.style.x, bullet.style.y);
                    
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