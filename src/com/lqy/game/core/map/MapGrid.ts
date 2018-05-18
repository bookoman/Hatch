/*
* name;
*/
class MapGrid extends Laya.Sprite{
    public px:number;
    public py:number;
    public op:Point;
    constructor(px:number,py:number){
        super();
        this.px = px;
        this.py = py;
    }

    public drawTitle():void
    {
        var diamondWF:number = GameConfig.LINEUP_GRID_WIDTH / 2;
        var diamondHF:number = GameConfig.LINEUP_GRID_HEIGHT / 2;
        this.graphics.drawPoly(0,0,[0,-diamondHF,diamondWF,0,0,diamondHF,-diamondWF,0],"#00ff00","#ff0000");
        var text:Laya.Label = new Laya.Label();
        text.fontSize = 24;
        text.text = this.px + "," + this.py;
        // text.text = this.op.x + "," + (this.op.y + GameConfig.MAP_INIT_Y);
        text.width = 60;
        text.height = 30;
        // text.x = diamondWF - text.width / 2;
        // text.y = diamondHF - text.height / 2;
        this.addChild(text);
        this.x = this.op.x + diamondWF;
        this.y = this.op.y + diamondHF + GameConfig.MAP_INIT_Y + GameConfig.BATTLE_SCENE_OFFSET_Y;
        // console.log(this.x,this.y);
        LayerManager.ins.addToLayer(this,LayerManager.TIP_LAYER,false,true,false);

    }

    public clearDraw():void
    {
        this.removeSelf();
    }
    
    
}