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
        this.view.btnRecharge.on(Laya.Event.CLICK,this,this.onBtnRecharge);
        this.view.btnRechargeExit.on(Laya.Event.CLICK,this,this.onBtnRechargeExit);       
    }

    protected removeEvents():void
    {
        this.view.btnOpen.off(Laya.Event.CLICK,this,this.onBtnClose);
        this.view.btnRecharge.off(Laya.Event.CLICK,this,this.onBtnRecharge);
        this.view.btnRechargeExit.off(Laya.Event.CLICK,this,this.onBtnRechargeExit);
    }

    private onBtnClose(e:Laya.Event):void
    {
        LayerManager.ins.removeToLayer(this.view,LayerManager.UI_LAYER,true,false);
    }

    private onBtnRecharge(e:Laya.Event):void
    {
        console.log("功能暂时关闭"+ this.view.inputName.text);   
    }
    
    private onBtnRechargeExit(e:Laya.Event):void
    {
        LayerManager.ins.removeToLayer(this.view,LayerManager.UI_LAYER,true,false);
    }
}