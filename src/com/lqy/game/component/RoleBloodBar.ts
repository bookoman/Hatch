
/*
* 血条
*/
class RoleBloodBar extends Laya.Sprite{
    private bg:Laya.Image;
    private progress:Laya.Image;
    private txt:Text;
    constructor(){
        super();
        this.initSkin();
    }
    private initSkin():void
    {
        this.bg = new Laya.Image("main/img_bloodbg.png");
        this.bg.sizeGrid = "10,10,10,10"
        this.bg.width = 200;
        // this.bg.texture = Laya.loader.getRes("main/img_bloodbg.png");
        this.addChild(this.bg);
        this.progress = new Laya.Image("main/img_blood.png");
        this.progress.sizeGrid = "2,2,2,2";
        this.progress.x = 5;
        this.progress.y = 5;
        // this.progress.texture = Laya.loader.getRes("main/img_blood.png");
        this.progress.width = 190;
        this.addChild(this.progress);
    }
    public init():void
    {
        this.setProgress(0);
    }
    /**
     * 
     * @param value (0-1)
     */
    public setProgress(value:number):void
    {
        var rect:Rectangle = new Rectangle(0,0,this.progress.width,this.progress.height);
        rect.x = value * rect.width;
        this.progress.scrollRect = rect;
    }
}