/*
* 游戏主界面代理器
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
        this.battleReportMediator = new BattleReportMediator("main/img_reportsbg.png");
        
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
        EventManager.ins.addEvent(EventManager.CHALLENGE_BOSS,this,this.challegenBossHandler);
    }
    protected removeEvents():void
    {
        this.view.btnOpen.off(Laya.Event.CLICK,this,this.onBtnOpen);
        this.view.btnAni.off(Laya.Event.CLICK,this,this.onPlayAni);
        EventManager.ins.removeEvent(EventManager.CHALLENGE_BOSS,this.challegenBossHandler);
    }
    private challegenBossHandler(data:any):void
    {
        var isEnd:boolean = data[0];
        if(isEnd == false)
        {
            BattleEngine.ins.challegenBoss();
        }
        this.battleReportMediator.setVisible(isEnd);
        GameDataManager.ins.resetRolePoint();
        RoleManager.ins.resetRolePoint();
    }
    private onPlayAni(e:Laya.Event):void
    {
        // var testMediator:TestMediator = new TestMediator();
        var challegenBossMediator:ChallegenBossMediator = new ChallegenBossMediator();
        //挑战boss
        MapManager.ins.enterMap("res/map",10000,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
        
        
    }

    private onBtnOpen(e:Laya.Event):void
    {
        SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
    }
    
    public dispose():void
    {
        
    }
    
}