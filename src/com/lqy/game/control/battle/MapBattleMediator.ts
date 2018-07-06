/*
* 地图战斗
*/
class MapBattleMediator extends BaseMediator{
    private battleReportMediator:BattleReportMediator = null;
    private challegenBossMediator:ChallegenBossMediator = null;
    
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.battle.MapBattleViewUI();
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,true,true);
        super.initView();
    }
    protected addEvents():void
    {
        this.view.btnChalleangeBoss.on(Laya.Event.CLICK,this,this.onChalleangeBoss);
        EventManager.ins.addEvent(EventManager.CHALLENGE_BOSS,this,this.challegenBossHandler);
        
        
    }
    protected removeEvents():void
    {
        this.view.btnChalleangeBoss.off(Laya.Event.CLICK,this,this.onChalleangeBoss);
        EventManager.ins.removeEvent(EventManager.CHALLENGE_BOSS,this.challegenBossHandler);
        
        
    }
    /**更新所有战报 */
    public allReportDataUpdate():void
    {
        if(this.battleReportMediator){
            this.battleReportMediator.allReportDataUpdate();
        }
    }
    /**清除战报视图 */
    public clearReportView():void
    {
        if(this.battleReportMediator){
            this.battleReportMediator.clearReportView();
        }
    }
    /**进入地图假战斗 */
    public enterMapBattle():void
    {
        this.battleReportMediator = new BattleReportMediator();
        
        //初始化游戏场景
        MapManager.ins.enterMap("res/map",1,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
        
        RoleManager.ins.initHeros();
        BattleEngine.ins.run();
    }
    
    private challegenBossHandler(data:any):void
    {
        var isEnd:boolean = data[0];
        if(isEnd == false)
        {
            
        }
        else
        {
            if(this.challegenBossMediator)
                this.challegenBossMediator.dispose();
            this.battleReportMediator.allReportDataUpdate();
        }
        // RoleManager.ins.resetRolePoint();
    }
    /**
     * 挑战boss
     * @param e 
     */
    private onChalleangeBoss(e:Laya.Event):void
    {
        this.clearReportView();

        MapManager.ins.enterMap("res/map",10000,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
        GameDataManager.ins.productBossData();
        var resAry:Array<Object> = [{url:"unpack/challengeboss/bg.png",type:Loader.IMAGE}];
        var bossData:EnemyData;
        var roleVos:Array<BaseRoleVo> = GameDataManager.ins.bossData.masterVos;
        roleVos = roleVos.concat(GameDataManager.ins.selfPlayerData.upHeroVos);
        roleVos.forEach(baseRoleVo => {
            //角色资源
            resAry.push({url:"res/outside/spine/role/"+baseRoleVo.modelId+"/"+ baseRoleVo.modelId +".sk",type:/*laya.net.Loader.BUFFER*/"arraybuffer"});
        });
        this.challegenBossMediator = new ChallegenBossMediator(resAry);

        SoundsManager.ins.playerMusicByEnum(MusicBGType.TURE_BATTLE,1000);
    }
    public dispose():void
    {
        
    }
}