/*
* 游戏数据管理器
*/
class GameDataManager{
    public selfPlayerData:PlayerData = null;
    public enemyData:EnemyData = null;
    public bossData:EnemyData = null;
    /**是否再挑战boss */
    public isChallengeBoss:boolean = false;
    constructor(){
        
    }
    private static _ins:GameDataManager = null;
    public static get ins():GameDataManager
    {
        if(this._ins == null)
        {
            this._ins = new GameDataManager();
        }
        return this._ins;
    }

    public initData():void
    {
        
        //测试数据
        this.selfPlayerData = new PlayerData();
        this.selfPlayerData.id = 88888888;
        this.selfPlayerData.name = "SimplePlan";
        // this.selfPlayerData.lineupId = "1";
        // var lineupposVoAry:Array<LineupPosVo> = LineupManager.ins.getCofingByID(this.selfPlayerData.lineupId);
        this.selfPlayerData.roleVoAry = [];
        var ids:Array<string> = ["10000","10001","10005","10002","10003","10004"];
        var roleVo:RoleVo;
        for(var i = 0;i < ids.length;i++)
        {
            roleVo = ConfigManager.ins.getRoleVoByID(ids[i]);
            if(roleVo)
            {
                roleVo.lineupGrid = i + 1;
                roleVo.initRowColPosPoint();
                this.selfPlayerData.roleVoAry.push(roleVo);
            }
        }
        this.selfPlayerData.roleVoAry.sort(
            function(a:RoleVo,b:RoleVo):number{
                return a.atts > b.atts ? -1 : 1
            }
        );
        this.selfPlayerData.heroSum = this.selfPlayerData.roleVoAry.length;
    }

    /**生产敌人 */
    public produceEnemyData():void
    {
        //怪物数据
        this.enemyData = new EnemyData();
        this.enemyData.roleVoAry = [];
        var ids:Array<string> = ["20001","20000","20002"];
        // var ids:Array<string> = ["20001"];
        var roleVo:RoleVo;
        for(var i = 0;i < ids.length;i++)
        {
            roleVo = ConfigManager.ins.getRoleVoByID(ids[i]);
            if(roleVo)
            {
                roleVo.lineupGrid = i + 1;
                roleVo.initRowColPosPoint();
                this.enemyData.roleVoAry.push(roleVo);
            }
        }
        this.enemyData.roleVoAry.sort(
            function(a:RoleVo,b:RoleVo):number{
                return a.atts > b.atts ? -1 : 1
            }
        );
        this.enemyData.enemySum = this.enemyData.roleVoAry.length;
    }
    /**
     * 生产Boss数据
     */
    public productBossData():void
    {
        //怪物数据
        this.bossData = new EnemyData();
        this.bossData.roleVoAry = [];
        var ids:Array<string> = ["20001","20000","20002","20003","20004"];
        var roleVo:RoleVo;
        for(var i = 0;i < ids.length;i++)
        {
            roleVo = ConfigManager.ins.getRoleVoByID(ids[i]);
            if(roleVo)
            {
                roleVo.lineupGrid = i + 1;
                roleVo.initRowColPosPoint();
                this.bossData.roleVoAry.push(roleVo);
            }
        }
        this.bossData.roleVoAry.sort(
            function(a:RoleVo,b:RoleVo):number{
                return a.atts > b.atts ? -1 : 1
            }
        );
        this.bossData.enemySum = this.bossData.roleVoAry.length;
    }
    /**
     * 矫正角色坐标
     */
    public resetRolePoint():void
    {
        if(this.selfPlayerData)
        {
            this.selfPlayerData.roleVoAry.forEach(roleVo => {
                roleVo.initRowColPosPoint();
            });
        }
        if(this.enemyData)
        {
            this.enemyData.roleVoAry.forEach(roleVo => {
                roleVo.initRowColPosPoint();
            });

        }
    }
}