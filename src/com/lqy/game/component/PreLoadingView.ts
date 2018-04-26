
import LayaImage = Laya.Image;
import LayaLabel = Laya.Label;
/*
* 进入游戏资源加载条
*/
class PreLoadingView extends Laya.Sprite{
    private imgBg:LayaImage;
    private imgProBg:LayaImage;
    private imgPro:LayaImage;
    private lblPro:LayaLabel;
    
    constructor(){
        super();
    }

    public initSkin():void
    {
        this.imgBg = new LayaImage("res/outside/preload/bg.jpg");
        this.addChild(this.imgBg);
        Laya.loader.load(["res/outside/preload/progress.png","res/outside/preload/progressBg.png"],Laya.Handler.create(this,this.resLoaded));
    }
    private resLoaded(e):void
    {
        this.imgProBg = new LayaImage();
        this.imgProBg.texture = Laya.loader.getRes("res/outside/preload/progressBg.png");
        this.addChild(this.imgProBg);
        this.imgPro = new LayaImage();
        this.imgPro.texture = Laya.loader.getRes("res/outside/preload/progress.png");
        this.setProgress(0);
        this.addChild(this.imgPro);
        this.lblPro = new LayaLabel();
        this.addChild(this.lblPro);
    }
    public setProgress(value:number):void
    {
        var rect:Rectangle = this.imgPro.scrollRect;
        rect.x = value * this.imgPro.texture.width;
    }

}