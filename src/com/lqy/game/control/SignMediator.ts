/*
* name;
*/
class SignMediator extends BaseMediator{
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.SignViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,true,false);
        super.initView();
    }
    protected addEvents():void
    {
        this.view.btnClose.on(Laya.Event.CLICK,this,this.onBtnClose);
    }

    protected removeEvents():void
    {
        this.view.btnOpen.off(Laya.Event.CLICK,this,this.onBtnClose);
    }

    private onBtnClose(e:Laya.Event):void
    {
        console.log("输入框："+ this.view.inputName.text);
    }

    

}