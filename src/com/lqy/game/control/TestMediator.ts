/*
* name;
*/
class TestMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.test.TestPageUI();
        AnimationManager.ins.popCenterLittleToBig(this.view);
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,true,true);
        super.initView();
    }
    protected addEvents():void
    {
        this.view.btnClose.on(Laya.Event.CLICK,this,this.onClose);
        
    }

    protected removeEvents():void
    {
        
    }
    

    private onClose(e:Laya.Event):void
    {
        LayerManager.ins.removeToLayer(this.view,LayerManager.UI_LAYER,true,true);
    }
}