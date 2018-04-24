/**
 * name
 */
class ChoiceMediator extends BaseMediator{
    constructor(assetsUrl = null,view = null){
        super(assetsUrl,view);
    }

    protected initView():void{
        this.view = new ui.ChoiceQuFuUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,true,false,true);
        super.initView();
    }

    protected addEvents():void{
        this.view.btnChoiceOK.on(Laya.Event.CLICK,this,this.onBtnChoiceOK);
    }

    protected removeEvents():void{
        this.view.btnChoiceOK.off(Laya.Event.CLICK,this,this.onBtnChoiceOK);
    }

    public dispose():void
    {
        
    }

    private onBtnChoiceOK():void{
        LayerManager.ins.removeToLyaer(this.view,LayerManager.UI_LAYER,true,false);
    }
}