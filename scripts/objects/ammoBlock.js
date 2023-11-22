import Block from "./block.js";

export default class AmmoBlock extends Block {
    constructor(x,y,dataBullets){
        super(x,y);
        this.data = dataBullets;
        this.blockCreate();
    }
    getData(){
        return this.data;
    }
    blockCreate(){
       let block = document.createElement("div");
       block.setAttribute("class", "ammo");
       block.style.position = "absolute";
       block.style.top = this.y + "px";
       block.style.left = this.x + "px";
       document.body.appendChild(block);
    }
}