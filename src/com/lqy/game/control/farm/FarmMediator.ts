/*
* 农场
*/
class FarmMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any,caller?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.farm.FarmViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,true,true);
        console.log(this.view.mouseThrough,this.view.mouseEnabled)
        super.initView();
        //var spr:Sprite;
        //spr.mouseEnabled
        //入场动画
        
    }
    protected addEvents():void
    {
        this.view.btnClose.on(Laya.Event.CLICK, this,this.onCloseBtnClick);
    }
    protected removeEvents():void
    {
        this.view.btnClose.off(Laya.Event.CLICK, this,this.onCloseBtnClick);
    }
    private onCloseBtnClick(e):void
    {
        this.dispose();
        // console.log(e.target);
    }

    public dispose():void
    {
        if(this.view)
        {
            
        }
        super.dispose();
    }
}