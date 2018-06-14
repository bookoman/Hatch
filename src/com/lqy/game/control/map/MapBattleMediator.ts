/*
* 地图战斗
*/
class MapBattleMediator extends BaseMediator{
    private battleReportMediator:BattleReportMediator = null;
    private challegenBossMediator:ChallegenBossMediator = null;
    /**世界地图 */
    private mapWorldMediator:MapWorldMediator = null;
    constructor(assetsUrl?:any,view?:any){
        super(assetsUrl,view);
    }
    protected initView():void
    {
        this.view = new ui.map.MapBattleViewUI();
        this.view.mapWordView.visible = false;
        LayerManager.ins.addToLayer(this.view,LayerManager.UI_LAYER,false,false,true);
        super.initView();

        if(GameDataManager.ins.gateInfoDic == null)
        {
            ClientSender.gateGateInfoReq();
            // this.showMapWordMediator();
        }
        else
        {
            this.view.mapWordView.removeSelf();
            // this.enterMapBattle();
        }
    }
    protected addEvents():void
    {
        this.view.btnChalleangeBoss.on(Laya.Event.CLICK,this,this.onChalleangeBoss);
        EventManager.ins.addEvent(EventManager.CHALLENGE_BOSS,this,this.challegenBossHandler);
        EventManager.ins.addEvent(EventManager.CHOICE_CHALLEGEN_GATE,this,this.choiceChanllegeGate);
        WebSocketManager.ins.registerHandler(Protocol.GATE,Protocol.GATE_INFO,new GetGateInfoHandler(this,this.gateInfoHanlder));
    }
    protected removeEvents():void
    {
        this.view.btnChalleangeBoss.off(Laya.Event.CLICK,this,this.onChalleangeBoss);
        EventManager.ins.removeEvent(EventManager.CHALLENGE_BOSS,this.challegenBossHandler);
        EventManager.ins.removeEvent(EventManager.CHOICE_CHALLEGEN_GATE,this.choiceChanllegeGate);
        WebSocketManager.ins.unregisterHandler(Protocol.GATE,Protocol.GATE_INFO,this);
    }
    private choiceChanllegeGate():void
    {
        this.mapWorldMediator.dispose();
        this.enterMapBattle();
        
    }
    private gateInfoHanlder():void
    {
        this.showMapWordMediator();
    }

    private showMapWordMediator():void
    {
        var resAry:Array<Object> = [
            {url:"res/atlas/worldmap.atlas",type:Loader.ATLAS}
            ];
        this.mapWorldMediator = new MapWorldMediator(resAry,this.view.mapWordView);
    }

    /**进入地图假战斗 */
    public enterMapBattle():void
    {
        this.battleReportMediator = new BattleReportMediator();
        
        //初始化游戏场景
        MapManager.ins.enterMap("res/map",2,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
        
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
        }
        // RoleManager.ins.resetRolePoint();
    }
    /**
     * 挑战boss
     * @param e 
     */
    private onChalleangeBoss(e:Laya.Event):void
    {
        // MapManager.ins.enterMap("res/map",10000,MapUtil.TYPE_LOAD_NOCUT,400,300,920,300);
        // GameDataManager.ins.productBossData();
        // var resAry:Array<Object> = [{url:"unpack/challengeboss/bg.png",type:Loader.IMAGE}];
        // var bossData:EnemyData;
        // var roleVos:Array<RoleVo> = GameDataManager.ins.bossData.roleVoAry.concat(GameDataManager.ins.selfPlayerData.roleVoAry);
        // roleVos.forEach(roleVo => {
        //     //角色资源
        //     resAry.push({url:"res/outside/anim/role/"+roleVo.modelId+"/"+ roleVo.modelId +".sk",type:/*laya.net.Loader.BUFFER*/"arraybuffer"});
        // });
        // this.challegenBossMediator = new ChallegenBossMediator(resAry);
    }
    public dispose():void
    {
        
    }
}