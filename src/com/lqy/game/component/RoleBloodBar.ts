
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
    public initSkin():void
    {
        this.bg = new Laya.Image();
        this.bg.texture = Laya.loader.getRes("main/img_bloodbg.png");
        this.addChild(this.bg);
        this.progress = new Laya.Image();
        this.progress.x = 1;
        this.progress.texture = Laya.loader.getRes("main/img_blood.png");
        this.setProgress(0);
        this.addChild(this.progress);
    }
    /**
     * 
     * @param value (0-1)
     */
    public setProgress(value:number):void
    {
        var rect:Rectangle = new Rectangle(0,0,this.progress.texture.width,this.progress.texture.height);
        rect.x = value * rect.width;
        this.progress.scrollRect = rect;
    }
}