/*
* 挑战boss界面
*/
class ChallegenBossMediator extends BaseMediator{
    private curMapConfig:Object;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        
        this.view = new ui.ChallengeBossViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();
    }
    protected addEvents():void
    {
        this.view.btnFast.on(Laya.Event.CLICK,this,this.onBtnFast);
    }

    protected removeEvents():void
    {
        this.view.btnFast.off(Laya.Event.CLICK,this,this.onBtnFast);
    }

    private onBtnFast(e):void
    {
        BattleEngine.ins.endBattle();
        BattleDataManager.ins.initData();
        LayerManager.ins.removeToLyaer(this.view,LayerManager.UI_LAYER,true,false);
    }

    
}