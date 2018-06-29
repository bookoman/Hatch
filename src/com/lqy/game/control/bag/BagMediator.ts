/*
* 背包
*/
class BagMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any,caller?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.bag.BagViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();
        //入场动画
        Tween.to(this.view.bagTitleImage, { x: 0 }, 500, Ease.backInOut);
        Tween.to(this.view.bagPanel, { x: 9 }, 500, Ease.backInOut);

    }
    protected addEvents():void
    {
        // this.view.closeBth.on(Laya.Event.CLICK, this,this.onCloseBtnClick);
        
    }
    protected removeEvents():void
    {

    }
    private onCloseBtnClick(e):void
    {
        Tween.to(this.view.bagTitleImage, { x: -227 }, 100);
        Tween.to(this.view.bagPanel, { x: 755 }, 100, null, Handler.create(this, this.dispose));
    }

    public dispose():void
    {
        Laya.Tween.clearAll(this.view.bagTitleImage);
        Laya.Tween.clearAll(this.view.bagPanel);
        super.dispose();
    }
}