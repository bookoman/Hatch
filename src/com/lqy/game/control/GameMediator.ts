/*
* 游戏主界面代理器
*/
class GameMediator extends BaseMediator{
    private battleReportMediator:BattleReportMediator = null;
    private challegenBossMediator:ChallegenBossMediator;
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
        this.view.btnChalleangeBoss.on(Laya.Event.CLICK,this,this.onChalleangeBoss);
        EventManager.ins.addEvent(EventManager.CHALLENGE_BOSS,this,this.challegenBossHandler);
    }
    protected removeEvents():void
    {
        this.view.btnOpen.off(Laya.Event.CLICK,this,this.onBtnOpen);
        this.view.btnChalleangeBoss.off(Laya.Event.CLICK,this,this.onChalleangeBoss);
        EventManager.ins.removeEvent(EventManager.CHALLENGE_BOSS,this.challegenBossHandler);
    }
    private challegenBossHandler(data:any):void
    {
        var isEnd:boolean = data[0];
        if(isEnd == false)
        {
            
        }
        else
        {
            this.challegenBossMediator.dispose();
        }
        // RoleManager.ins.resetRolePoint();
    }
    private onChalleangeBoss(e:Laya.Event):void
    {
        MapManager.ins.enterMap("res/map",10000,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
        GameDataManager.ins.productBossData();
        var resAry:Array<Object> = [{url:"unpack/challengeboss/bg.png",type:Loader.IMAGE}];
        var bossData:EnemyData;
        var roleVos:Array<RoleVo> = GameDataManager.ins.bossData.roleVoAry.concat(GameDataManager.ins.selfPlayerData.roleVoAry);
        roleVos.forEach(roleVo => {
            //角色资源
            resAry.push({url:"res/outside/anim/role/role"+roleVo.id+"/"+ roleVo.id +".sk",type:/*laya.net.Loader.BUFFER*/"arraybuffer"});
        });
        this.challegenBossMediator = new ChallegenBossMediator(resAry);
    }

    private onBtnOpen(e:Laya.Event):void
    {
        SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
    }
    
    public dispose():void
    {
        
    }
    
}