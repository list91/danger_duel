export default class Player {
    constructor(gun) {
        this.THIS_GUN = gun;
        this.inventory = document.getElementById("hp");
        this.inventory.style.width = "324px"
        this.gunInit();
        this.hpMax = 60;
        this.hpBar = document.getElementById("hp_bar");
        this.hpBar.style.width = "300px"
        console.log(this.hpBar.style.width);
        this.hpMaxSise = parseInt(this.hpBar.style.width);
        this.HP = this.hpMax;
        this.player = document.getElementById("player");
        this.speedPlayer = 8;
        this.rechargeSpeed = gun.getRechargeSpeed();
        this.shooting = true;
        this.platforms = document.getElementsByClassName("platform");
        this.line = document.getElementsByClassName("line")[0];
        this.bulletSpeed = 80;
        this.xPos = 52;
        this.yPos = 310;
        this.ySpeed = 0;
        this.xSpeed = 0;
        this.isJumping = false;
        this.isRight = false;
        this.isLeft = false;
        this.isUp = false;
        this.isDown = false;
        this.isDamage = false;
        this.isDamageMaxCount = 50;
        this.isDamageCount = 50;
        this.currentXSpeed = this.xSpeed;
        this.bullets = [];
        this.angleGlobal = 0;
        this.updateHP();
        this.addEventListeners();
        this.setStartPositionXY();
    }
    getHpCountsSiseForSyle(){
        var hpCountsProc = this.HP/this.hpMax*100;
        // alert(this.hpMaxSise);
        return this.hpMaxSise*hpCountsProc/100;
    }
    getHpCountsForLabel(){
        //имеющиеся на максимальные и *100 это в процентах сколько сейчас
        var hpSise = this.hpBar.style.width;
        var hpPixelProc = parseInt(hpSise)/this.hpMaxSise*100;
        // console.log(hpSise);
        //максимальное число умнажаем на желаемы процент и делим на 100
        return this.hpMax*hpPixelProc/100;
    }
    setGun(gun){
        this.THIS_GUN = gun;
        this.gunInit();
    }
    gunInit(){
        this.radiusSpeed = this.THIS_GUN.getRadiusSpeed();
        this.bulletCount = this.THIS_GUN.getCountsSize();
        this.bullet_name = document.getElementById("gun");
        this.bullet_indicator = document.getElementById("bullet");
        this.bulletsFinal = this.THIS_GUN.getMaxBullets();
        this.damage = this.THIS_GUN.getDamage();
        this.allBullets = this.bulletsFinal;

        this.bulletPeriod = this.THIS_GUN.getSpeed();
        this.bullet_indicator.textContent = this.allBullets + "/" + this.bulletsFinal;
        this.bullet_name.textContent = this.THIS_GUN.getTitle();
    }
    getDamage(){
        return this.damage;
    }

    getPlayer(){
        return this.player;
    }

    setStartPositionXY() {
        this.player.style.left = this.xPos + "px";
        this.player.style.top = this.yPos + "px";
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
    setDamageHP(damage) {
        if(this.HP < damage){
            // this.killHero();
        }else{
            this.HP = this.HP-damage;
            this.updateHP();

        }
    }
    updateHP(){
        this.hpBar.style.width = this.getHpCountsSiseForSyle()+"px";
        document.getElementById("hp_title").innerText = "HP "+Math.round(this.getHpCountsForLabel());
    }

    checkCollisionsEnemy(enemy){
        // console.log(enemy);
        let playerRect = this.player.getBoundingClientRect();
        let enemyRect = enemy.enemy.getBoundingClientRect();
            // console.log(bullet.style.bottom);
            
            if(enemyRect.bottom >= playerRect.top &&
                enemyRect.top <= playerRect.bottom &&
                enemyRect.right >= playerRect.left &&
                enemyRect.left <= playerRect.right
                ){
                if(this.isDamage === false){
                    this.setDamageHP(enemy.getDamage());
                    this.isDamage = true;    
                } 
                if(this.isDamage === true){
                    if(this.isDamageCount > 0){
                        this.isDamageCount-=1;
                    } else {
                        this.isDamage = false;
                        this.isDamageCount = this.isDamageMaxCount;
                    }
                    // this.isDamage = true;    
                }
            }
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
                    console.log(bullet.style.x, bullet.style.y);
                    
                    // this.createCollisionBlock(bulletRect.left, platformRect.top);
                    bullet.style.display = "none";
                    // bullet.style.top = this.yPos + "px"; 
            }
        }

        // this.inventory.style.top =
            // playerRect.top - inventoryRect.height + "px";

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
    fireAtEnemy(enemy) {
        const clickX = enemy.getBoundingClientRect().left;
        const clickY = enemy.getBoundingClientRect().top;
        const playerX = parseInt(
          window.getComputedStyle(this.player).getPropertyValue("left")
        );
        const playerY = parseInt(
          window.getComputedStyle(this.player).getPropertyValue("top")
        );
        // var list = [-0.1,0.1];
         var rand = Math.random() * 0.10 - 0.005;;

        const angle = Math.atan2(clickY - playerY, clickX - playerX)+rand;
        // Math.floor(Math.random() * (angle+10 - angle-10 + 1)) + angle-10;
        
        this.createBullet(playerX, playerY, angle);
        this.allBullets -= 1;
        this.bullet_indicator.textContent = this.allBullets + "/" + this.bulletsFinal;
      }

    createBullet(xPos, yPos, angle) {
        // for (let i = 0; i < 2; i++) {
        //     // enemiesList.push(new Enemy(100, 100))
        // }
        const bullet = document.createElement("div");
        bullet.setAttribute("class", "bullet");
        bullet.style.left = xPos + this.player.style.width + "px";
        bullet.style.top = yPos + "px";
        bullet.style.transform = "rotate(" + angle + "rad)";
        document.body.appendChild(bullet);
        this.bullets.push({
            element: bullet,
            xSpeed: Math.cos(angle) * this.bulletSpeed,
            ySpeed: Math.sin(angle) * this.bulletSpeed,
            angle: angle,
        });
    }

    updateBullets() {
        for (let i = 0; i < this.bullets.length; i++) {
            let bullet = this.bullets[i];
            let bulletElement = bullet.element;
            let leftPosition = parseInt(
                window.getComputedStyle(bulletElement).getPropertyValue("left")
            );
            let topPosition = parseInt(
                window.getComputedStyle(bulletElement).getPropertyValue("top")
            );

            bulletElement.style.left = leftPosition + bullet.xSpeed + "px";
            bulletElement.style.top = topPosition + bullet.ySpeed + "px";

            if (
                leftPosition < 0 ||
                topPosition < 0 ||
                leftPosition > window.innerWidth ||
                topPosition > window.innerHeight
            ) {
                document.body.removeChild(bulletElement);
                this.bullets.splice(i, 1);
            }
        }
    }

    calculateRadius(cursorX, cursorY, playerX, playerY) {
        const distance = Math.sqrt(
            Math.pow(cursorX - playerX, 2) + Math.pow(cursorY - playerY, 2)
        );
        const radiusSpeed = this.radiusSpeed;
        // const radiusSpeed = 0.1;
        const radius = distance * radiusSpeed;
        return radius;
    }

    updateCursor(cursorX, cursorY, playerX, playerY) {
        const radius = this.calculateRadius(cursorX, cursorY, playerX, playerY);
        const cursor = document.getElementById("cursor");

        this.line.style.width = radius + "px";
        cursor.style.width = radius + "px";
        cursor.style.height = radius + "px";
        cursor.style.borderRadius = radius / 2 + "px";
        cursor.style.left = cursorX - radius / 2 + "px";
        cursor.style.top = cursorY - radius / 2 + "px";
    }

    handleMouseDown(event) {
        
        if (event.button === 0 && this.shooting) {
            this.mouseDown = true;
            this.handleClick(event);
            this.mouseInterval = setInterval(() => {
                console.log("this.mouseDown "+this.mouseDown);
                if(!this.mouseDown){
                    clearInterval(this.mouseInterval);
                } else {
                this.handleClick(event);
                }
            },  this.bulletPeriod);
        }
    }

    handleMouseUp(event) {
        if (event.button === 0) {
            this.mouseDown = false;
            clearInterval(this.mouseInterval);
        }
    }

    handleClick(event) {
        const clickX = event.clientX;
        const clickY = event.clientY;
        const playerX = parseInt(
            window.getComputedStyle(this.player).getPropertyValue("left")
        );
        const playerY = parseInt(
            window.getComputedStyle(this.player).getPropertyValue("top")
        );

        const lineRect = this.line.getBoundingClientRect();
        const lineX = lineRect.left;
        const lineY = lineRect.top;
        const lineWidth = lineRect.width;
        const lineHeight = lineRect.height;

        const bulletCount = this.bulletCount;
        console.log("bulletCount "+this.allBullets);
        if (this.allBullets > 0) {
        for (let i = 0; i < bulletCount; i++) {
        const randomX = Math.floor(Math.random() * lineWidth) + lineX;
        const randomY = Math.floor(Math.random() * lineHeight) + lineY;

        const angle = Math.atan2(randomY - playerY, randomX - playerX);
            let UGOL = angle * (180 / Math.PI);
            let finishUgol = this.findAngleC(
                UGOL,
                this.distanceBetweenPoints(clickX, clickY, playerX, playerY)
            );

                this.createBullet(playerX, playerY, angle);
                // this.createBullet(playerX, playerY, angle);

                this.allBullets -= 1;
                this.bullet_indicator.textContent =
                this.allBullets + "/" + this.bulletsFinal;
            }
        }
    }

    recharge() {
        var rechargeMaxSize = 162;
        var rechargeBlock = document.getElementById("recharge");
        rechargeBlock.style.display = "block";
        document.getElementById("recharge_bar").style.width = "0px";
        var speed = this.rechargeSpeed;
        var intervalId = setInterval(() => {
            // var shooting = false;
            var width = parseFloat(document.getElementById("recharge_bar").style.width);
            if(width < rechargeMaxSize){
                this.shooting = false;
                document.getElementById("recharge_bar").style.width = width + 2 + "px";
            } else {
                clearInterval(intervalId);
                this.allBullets = this.bulletsFinal;
                this.bullet_indicator.textContent =
                this.allBullets + "/" + this.bulletsFinal;
                rechargeBlock.style.display = "none";
                this.shooting = true;
            }
        }, speed)
    }

    update() {
        this.move();

        for (let platform of this.platforms) {
            this.handleCollisions(platform);
        }

        this.updateBullets();
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    findAngleC(angleA, distance) {
        let result = 180 - this.toDegrees(angleA) - 90;
        return this.toRadians(result) * -1;
    }

    updateLine(angle) {
        this.line.style.transform = "rotate(" + angle + "deg)";
    }

    distanceBetweenPoints(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }

    testUgolLine(UGOL) {
        this.updateLine(UGOL);
    }

    updateRotation(cursorX, cursorY) {
        const playerX = parseInt(
            window.getComputedStyle(this.player).getPropertyValue("left")
        );
        const playerY = parseInt(
            window.getComputedStyle(this.player).getPropertyValue("top")
        );

        const angle = Math.atan2(cursorY - playerY, cursorX - playerX);

        this.player.style.transform = `rotate(${angle}rad)`;
    }

    createCollisionBlock(x, y) {
        const block = document.createElement("div");
        block.style.position = "absolute";
        block.style.width = "5px";
        block.style.height = "5px";
        block.style.left = x + "px";
        block.style.top = y + "px";
        block.style.background = "red";
        document.body.appendChild(block);
    }

    addEventListeners() {
        document.addEventListener("mousemove", (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const clickX = event.clientX;
            const clickY = event.clientY;
            const playerX = parseInt(
                window.getComputedStyle(this.player).getPropertyValue("left")
            );
            const playerY = parseInt(
                window.getComputedStyle(this.player).getPropertyValue("top")
            );

            const angle = Math.atan2(clickY - playerY, clickX - playerX);

            this.testUgolLine(
                this.toDegrees(
                    this.findAngleC(angle, this.distanceBetweenPoints(clickX, clickY, playerX, playerY))
                )
            );

            this.line.style.left = event.x;
            this.updateCursor(
                mouseX,
                mouseY,
                parseInt(
                    window.getComputedStyle(this.player).getPropertyValue("left")
                ),
                parseInt(
                    window.getComputedStyle(this.player).getPropertyValue("top")
                )
            );

            this.updateRotation(mouseX, mouseY);
        });

        document.addEventListener("mousedown", this.handleMouseDown.bind(this));
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));

        document.addEventListener("keydown", (event) => {
            if (event.key === "d") {
                this.isLeft = false;
                this.isRight = true;
            } else if (event.key === "a") {
                this.isRight = false;
                this.isLeft = true;
            } else if (event.key === "w") {
                this.isUp = true;
                this.isDown = false;
            } else if (event.key === "s") {
                this.isDown = true;
                this.isUp = false;
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === "d") {
                this.isRight = false;
            } else if (event.key === "a") {
                this.isLeft = false;
            } else if (event.key === "w") {
                this.isUp = false;
            } else if (event.key === "s") {
                this.isDown = false;
            } else if (event.key === "r") {
                this.recharge();
            }
        });
    }
}