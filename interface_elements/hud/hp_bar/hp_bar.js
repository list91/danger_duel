class hp_bar{

	constructor(amount){
		this.hp = amount;
		this.amount = amount;
		this.bar = document.querySelectorAll('.bar')[0];
	}

	damage(dmg){
		if(this.hp>dmg)
		{
			this.hp-=dmg;
			this.update_bar();
		}
		else
		{
			this.hp = 0;
			this.update_bar();
		}
	}

	heal(amount){
		if(this.hp<this.amount-amount)
		{
			this.hp+=amount;
			this.update_bar();
		}
		else
		{
			this.hp = this.amount;
			this.update_bar();
		}
	}

	update_bar(){
		document.querySelectorAll('.bar')[0].style.width = this.hp*100/this.amount + "%";
		console.log(this.hp);
	}

}