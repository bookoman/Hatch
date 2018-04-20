/*
* 战斗引擎
* 一，阵型，站定九宫格，分三排、三列，每排3个位置，格子定位坐标
* 二，寻找攻击对象，普攻攻击同一排最前一个敌人，技能可以攻击后排或者一列一个或者多个敌人
* 三，发动攻击，近战攻击移到敌人身边攻击，远战攻击原地攻击
* 四，血量计算(测试) hp -= att
* 五，结束战斗，玩家胜利，玩家失败，清理战场，移除角色显示对象
*/
class BattleEngine{
    private timeCount:number;
    private battleTimeInterval:number;
    private battleDataMgr:BattleDataManager;
    private roleMgr:RoleManager;
    private skillView:SkillView;
    constructor(){
        this.battleDataMgr = BattleDataManager.ins;
        this.roleMgr = RoleManager.ins;
        //技能视图
        this.skillView = new SkillView();
        this.skillView.x = 10;
        this.skillView.y = 900;
        LayerManager.ins.addToLayer(this.skillView,LayerManager.UI_LAYER,false,false,false);
    }
    private static _ins:BattleEngine = null;
    public static get ins():BattleEngine
    {
        if(this._ins == null)
        {
            this._ins = new BattleEngine();
        }
        return this._ins;
    }
    
    private onRunComplete(data?:any):void
    {
        this.roleMgr.enemyRunCount++;
        if(this.roleMgr.enemyRunCount >= GameDataManager.ins.enemyData.enemySum)
        {
            this.roleMgr.enemyRunCount = 0;
            EventManager.ins.removeEvent(EventManager.ENEMY_RUNTO_COMPLETE,this.onRunComplete);
            this.startBattle();

        }
    }
    public run():void
    {
        this.timeCount = 0;
        this.battleTimeInterval = GameConfig.BATTLE_INTERVAL_TIME;
        Laya.timer.loop(1000,this,this.runUpdate);

    }
    /**更新 */
    private runUpdate():void
    {
        this.timeCount++;
        if(this.timeCount == this.battleTimeInterval)
        {
            this.rutoBallte();
        }
        this.battleDataMgr.runRoleSkillCD();
        
    } 
    /**
     * 跑去战斗
     */
    private rutoBallte():void
    {
        GameDataManager.ins.produceEnemyData();
        this.roleMgr.produceEnemy();
        this.roleMgr.enemyRun();
        this.battleDataMgr.initData();
        EventManager.ins.addEvent(EventManager.ENEMY_RUNTO_COMPLETE,this,this.onRunComplete);
    }
    /**开始战斗 */
    private startBattle():void
    {
        MapManager.ins.mapScrollSwitch = false;
        this.roleMgr.heroStand();
        this.attack();
    }
    private attack():void
    {
        this.battleDataMgr.startAtt();
        this.skillView.init(this.battleDataMgr.curAttRoleVo.skillVos);
        this.roleMgr.battleAtt(this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
        EventManager.ins.addEvent(EventManager.ENEMY_ATT_COMPLETE,this,this.attCompleted);
        // console.log("战斗，防御："+this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
    }
    private attCompleted():void
    {
        EventManager.ins.removeEvent(EventManager.ENEMY_ATT_COMPLETE,this.attCompleted);
        // this.battleDataMgr.calculationAttribute();
        if(this.battleDataMgr.isEnd)
        {
            this.endBattle();
        }
        else
        {
            this.attack();
        }
    }

    /**结束战斗 */
    private endBattle():void
    {
        this.timeCount = 0;
        MapManager.ins.mapScrollSwitch = true;
        this.roleMgr.clearRole();
        this.roleMgr.initHeros();
    }


}