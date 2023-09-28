import Enemy from "./enemy.js";

export default class Bot extends Enemy{
    createCheckLine(top, left){

        this.checkLine = document.createElement("div");
        this.checkLine.setAttribute("class", "check_line");
        this.checkLine.style.width = "10px";
        this.checkLine.style.height = "250px";
        this.checkLine.style.position = "absolute";
        this.checkLine.style.top = top-120 + "px";
        this.checkLine.style.left = left+20 + "px";
        this.checkLine.style.backgroundColor = "#000";
        document.body.appendChild(this.checkLine);

    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    createEnemyBlockAndCheckBox(top, left){
        // this.enemy = document.getElementById("player");
        this.enemy = document.createElement("div");
        this.checkBox = document.createElement("div");
        this.checkBox.setAttribute("class", "check_box");
        // this.checkBox.style.backgroundColor = "rgb(0 255 0)";
        this.checkBox.style.width = "200px";
        this.checkBox.style.height = "200px";
        this.checkBox.style.position = "absolute";
        this.checkBox.style.top = top + "px";
        this.checkBox.style.left = left + "px";
        this.checkBox.style.border = "2px solid";
        this.checkBox.style.borderRadius = "50%";
        
        
        this.enemy.setAttribute("class", "enemy");
        this.enemy.style.margin = "auto";
        this.enemy.style.marginTop = "35%";
        this.enemy.style.backgroundColor = "rgb(0 255 0)";
        this.enemy.style.width = "50px";
        this.enemy.style.height = "50px";
        // this.enemy.style.position = "absolute";
        this.enemy.style.top = top + "px";
        this.enemy.style.left = left + "px";
        // this.setStartPositionXY(top, left);
        this.checkBox.style.left = left + "px";
        this.checkBox.style.top = top + "px";
        this.checkBox.appendChild(this.enemy);
        document.body.appendChild(this.checkBox);
        
        this.checkBox.style.left = left + "px";
        this.checkBox.style.top = top + "px";

        this.createHpBar(top-30, left);
        this.hpMaxSise = parseInt(this.hpBar.style.width);
    }
    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }
    checkDamageTest(bullet, damage) {
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

    checkShot(bullet, hero, data) {
        // const heroRect = hero;
        const checkBoxRect = this.checkBox.getBoundingClientRect();
        const bulletRect = bullet.getBoundingClientRect();
        const enemyRect = this.enemy.getBoundingClientRect();

        // console.log(this.enemy.getBoundingClientRect());

        if (
            bulletRect.bottom >= checkBoxRect.top &&
            bulletRect.top <= checkBoxRect.bottom &&
            bulletRect.right >= checkBoxRect.left &&
            bulletRect.left <= checkBoxRect.right
        ) {

            var xB = bulletRect.left;
            var yB = bulletRect.top;

            var xH = hero.xPos;
            var yH = hero.yPos;

            var xE = enemyRect.left;
            var yE = enemyRect.top;

            // console.log(xB+" xB");
            // console.log(yB+" yB");

            // console.log(xH+" xH");
            // console.log(yH+" yH");
// ты тут писал обработку при уроне, если урон то меняем веса(еще ты не сделал проверку на БЛЭКЛИСТ весов)
            // console.log(xE+" xE");
            // console.log(yE+" yE");

            var angle = this.toRadians(this.findAngle(xH, yH, xB, yB, xH, yH, xE, yE));



            data.set(angle, {"leng_step": 15, "angle_step": 30})

            // if(xH > xB){
            //     angle = -1 * angle
            // }
            // if(xH > xE){
            //     angle = -1 * angle
            // }

            // this.hpBar.style.transform = "rotate(" + angle + "rad)";
            // console.log(this.toDegrees(angle));



            // console.log(Math.floor(Math.random() * (damage[1] - damage[0] + 1)) + damage[0]);
            // this.setDamageHP(Math.floor(Math.random() * (damage[1] - damage[0] + 1)) + damage[0]);
            // bullet.style.display = "none";
            // this.hpBar.style.backgroundColor = "rgb(0 0 255)";
        }
    }
    random(list){
        return Math.floor(Math.random() * (list[1] - list[0] + 1)) + list[0];
    }
    randomLengStep(){
        return this.random([0,50])
    }
    randomAngleStep(){
        return this.random([-180,180])
    }

    updateLine(hero){
        var xH = hero.xPos;
        var yH = hero.yPos;
        var xE = this.xPos;
        var yE = this.yPos;
        var angle = this.toRadians(this.findAngle(xE, yE, xH, yH, xE, yE, xH, yE));//* (Math.PI / 180)*-1;
        // if(yH>=yE){
        //     angle = -1 * angle
        // }
        // if(xH>=xE){
        //     angle = -1 * angle
        // }

        
        this.checkLine.style.transform = "rotate(" + angle + "rad)";
    }
    findAngle(x1, y1, x2, y2, x3, y3, x4, y4) {
        var vectorA = { x: x2 - x1, y: y2 - y1 };
        var vectorB = { x: x4 - x3, y: y4 - y3 };
        
        var angle = Math.atan2(vectorB.y, vectorB.x) - Math.atan2(vectorA.y, vectorA.x);
        
        // Преобразуем угол в градусы (-180 до 180)
        var degrees = angle * (180 / Math.PI);
        
        return degrees*-1;
    }

        // this.enemyBar = document.createElement("div");
        // this.enemyBar.setAttribute("class", "enemy_bar");
        // this.enemyBar.style.width = "60px";
        // this.enemyBar.style.height = "18px";
        // this.enemyBar.style.position = "absolute";
        // this.enemyBar.style.top = top-24 + "px";
        // this.enemyBar.style.left = left-5 + "px";

        // this.hpBar = document.createElement("div");
        // this.hpBar.setAttribute("class", "enemy_hp_bar");
        // this.hpBar.style.backgroundColor = "rgb(255 0 0)";
        // this.hpBar.style.width = "50px";
        // this.hpBar.style.height = "7px";
        // this.hpBar.style.margin = "5px";
        // // this.hpBar.style.position = "absolute";
        // this.hpBar.style.top = top + "px";
        // this.hpBar.style.left = left + "px";
        // this.setStartPositionXY(top, left);
        // this.enemyBar.appendChild(this.hpBar);
        // document.body.appendChild(this.enemyBar);
    
}