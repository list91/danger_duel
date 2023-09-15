export default class Player {
    constructor() {
      this.inventory = document.getElementById("inventory");
      this.player = document.getElementById("player");
      this.gravity = 0.5;
      this.speedPlayer = 5;
      this.bullet_indicator = document.getElementById("bullet");
      this.platforms = document.getElementsByClassName("platform");
      this.line = document.getElementsByClassName("line")[0];
      this.bulletSpeed = 80;
      this.bulletsFinal = 132;
      this.allBullets = this.bulletsFinal;
      this.xPos = 0;
      this.yPos = 0;
      this.ySpeed = this.speedPlayer;
      this.xSpeed = this.speedPlayer;
      this.isJumping = false;
      this.isRight = false;
      this.isLeft = false;
      this.currentXSpeed = this.xSpeed;
      this.bullets = [];
      this.angleGlobal = 0;
      this.bullet_indicator.textContent = this.allBullets + "/" + this.bulletsFinal;
      this.addEventListeners();
      setInterval(this.update.bind(this), 30);
    }
  
    jump() {
      if (!this.isJumping) {
        this.isJumping = true;
        this.ySpeed = -10;
        this.xSpeed = this.currentXSpeed;
      }
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
            // if(this.isDown){
            //     this.moveDown();
            // }
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
  
          this.ySpeed = 0;
          this.isJumping = false;
        } else {
          this.ySpeed = 0;
        }
      }
    }
  
    createBullet(xPos, yPos, angle) {
      const bullet = document.createElement("div");
      bullet.setAttribute("class", "bullet");
      bullet.style.left = xPos + "px";
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
      const radiusSpeed = 0.3;
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
  
      const randomX = Math.floor(Math.random() * lineWidth) + lineX;
      const randomY = Math.floor(Math.random() * lineHeight) + lineY;
  
      const angle = Math.atan2(randomY - playerY, randomX - playerX);
      if (this.allBullets > 0) {
        let UGOL = angle * (180 / Math.PI);
        let finishUgol = this.findAngleC(
          UGOL,
          this.distanceBetweenPoints(clickX, clickY, playerX, playerY)
        );
  
        this.createBullet(playerX, playerY, angle);
  
        this.allBullets -= 1;
        this.bullet_indicator.textContent =
          this.allBullets + "/" + this.bulletsFinal;
      }
    }
  
    update() {
      this.move();
      this.ySpeed += this.gravity;
  
      this.player.style.top =
        parseInt(
          window.getComputedStyle(this.player).getPropertyValue("top")
        ) + this.ySpeed + "px";
  
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
    testUgolLine(UGOL){
        this.updateLine(UGOL)
        // console.log(UGOL);
    }
    // updateLine(angle) {
        // line.style.transform = "rotate(" + angle + "deg)";
    // }
  
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
      });
  
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
        }
      });
  
      document.addEventListener("click", this.handleClick.bind(this));
    }
  }
  
  // создание экземпляра игрока
  const player = new Player();