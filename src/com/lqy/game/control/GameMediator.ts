/*
* name;
*/
class GameMediator extends BaseMediator{
    private battleReportMediator:BattleReportMediator = null;
    
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.GameViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.BG_LAYER,false,false,true);
        super.initView();
        this.battleReportMediator = new BattleReportMediator();
        
        //初始化游戏场景
        ObjectPoolUtil.init();
        MapManager.ins.enterMap("res/map",1,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
        GameDataManager.ins.initData();
        RoleManager.ins.initHeros();
        BattleEngine.ins.run();
    }
    protected addEvents():void
    {
        this.view.btnOpen.on(Laya.Event.CLICK,this,this.onBtnOpen);
        this.view.btnAni.on(Laya.Event.CLICK,this,this.onPlayAni);
    }

    protected removeEvents():void
    {
        this.view.btnOpen.off(Laya.Event.CLICK,this,this.onBtnOpen);
        this.view.btnAni.off(Laya.Event.CLICK,this,this.onPlayAni);
    }
    private onPlayAni(e:Laya.Event):void
    {
        
    }

    private onBtnOpen(e:Laya.Event):void
    {
        
    }
    
    public dispose():void
    {
        
    }
    
}