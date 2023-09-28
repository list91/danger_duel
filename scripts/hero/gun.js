export default class Gun {
    constructor(title, bulletSpeed, oneShotCounts, maxBullets, rechargeSpeed, damage, radiusSpeed) {
        this.bulletSpeedPeriod = bulletSpeed;
        this.title = title;        
        this.oneShotCounts = oneShotCounts;
        this.maxBullets = maxBullets;
        this.rechargeSpeed = rechargeSpeed;
        this.damage = damage;
        this.radiusSpeed = radiusSpeed;
    }
    getRadiusSpeed(){return this.radiusSpeed}
    getDamage(){return this.damage}
    getSpeed(){return this.bulletSpeedPeriod}
    getTitle(){return this.title}
    getRechargeSpeed(){return this.rechargeSpeed}
    getMaxBullets(){return this.maxBullets}
    getCountsSize(){return this.oneShotCounts}

}