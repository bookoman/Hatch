/*
* 模块加载条视图
*/
class ModuleLoadingView extends Laya.Sprite{
    private radius:number = 100;
    private progressLine:number = 10;
    private lblProgress:Laya.Label = null;
    private maskSpr:Laya.Sprite = null;
    constructor(){
        super();
        this.initSkin();
    }
    private static _ins:ModuleLoadingView = null;
    public static get ins():ModuleLoadingView
    {
        if(this._ins == null)
        {
            this._ins = new ModuleLoadingView();
        }
        return this._ins;
    }

    private initSkin():void
    {
        this.graphics.drawCircle(0,0,this.radius,"#ffffff");
        if(this.maskSpr == null)
        {
            this.maskSpr = new Laya.Sprite();
            this.maskSpr.graphics.drawCircle(0,0,this.radius - this.progressLine,"#ffffff");
            this.addChild(this.maskSpr);
        }
        if(this.lblProgress == null)
        {
            this.lblProgress = new Laya.Label();
            this.lblProgress.width = 60;
            this.lblProgress.height = 30;
            this.lblProgress.x = -this.lblProgress.width / 2;
            this.lblProgress.y = -this.lblProgress.height / 2;
            this.lblProgress.fontSize = 24;
            this.lblProgress.align = "center";
            this.addChild(this.lblProgress);
        }
        
    }
    
    public setProgress(value:number):void
    {
        this.graphics.drawPie(0,0,this.radius,0,value * 360,"#ff0000");
        if(this.lblProgress)
        {
            this.lblProgress.text = value * 100 + "%";
        }
        if(value == 1)
        {
            Laya.timer.once(200,this,this.hide,null,false);
        }
    }

    public show():void
    {
        LayerManager.ins.addToLayer(this,LayerManager.TIP_LAYER,true,false,true);
    }

    public hide():void
    {
        LayerManager.ins.removeToLayer(this,LayerManager.TIP_LAYER,true,false);
    }
}