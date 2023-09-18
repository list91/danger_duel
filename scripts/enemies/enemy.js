export default class Enemy {
    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.speedPlayer = 5;
        this.createEnemyBlock();
        this.platforms = document.getElementsByClassName("platform");
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.isRight = false;
        this.isLeft = false;
        this.isUp = false;
        this.isDown = false;
        this.currentXSpeed = this.xSpeed;
    }

    runActionToPlayer(player){
        playerObj = player.getPlayer();
        playerX = playerObj.getBoundingClientRect.left;
        playerY = playerObj.getBoundingClientRect.top;

        
    }

    createEnemyBlock(){
        // this.enemy = document.getElementById("player");
        this.enemy = document.createElement("div");
        this.enemy.setAttribute("class", "enemy");
        this.enemy.style.backgroundColor = "rgb(0 255 0)";
        this.enemy.style.width = "50px";
        this.enemy.style.height = "50px";
        this.enemy.style.position = "absolute";
        this.setStartPositionXY();
        document.body.appendChild(this.enemy);
    }

    setStartPositionXY() {
        this.enemy.style.left = this.xPos + "px";
        this.enemy.style.top = this.yPos + "px";
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
        this.player.style.left = this.xPos + "px";
    }

    moveRight() {
        this.xPos += this.speedPlayer;
        this.player.style.left = this.xPos + "px";
    }

    moveUp() {
        this.yPos -= this.speedPlayer;
        this.player.style.top = this.yPos + "px";
    }

    moveDown() {
        this.yPos += this.speedPlayer;
        this.player.style.top = this.yPos + "px";
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