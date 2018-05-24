/*
* 游戏数据管理器
*/
class GameDataManager{
    /**登录认证 */
    public loginAuthentication:string;
    /**登录token */
    public loginToken:string;
    /**服务器列表数据 */
    public serverList:Array<ServerInfoVo>;
    /**当前服务器信息 */
    public curServerInfo:ServerInfoVo;

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
    /**保存服务器信息 */
    public saveServerInfoList(data:any,lastServer:any):void
    {
        this.serverList = new Array();
        var info:any;
        var serverInfo:ServerInfoVo;
        for(var i = 0;i < data.length;i++)
        {
            info = data[i];
            serverInfo = new ServerInfoVo();
            for (var key in info) {
                if (info.hasOwnProperty(key)) {
                    serverInfo[key] = info[key];
                }
            }
            this.serverList.push(serverInfo);
        }
        /**上一次登录服务器信息 */
        this.curServerInfo = new ServerInfoVo();
        for (var key in lastServer) {
            if (lastServer.hasOwnProperty(key)) {
                this.curServerInfo[key] = lastServer[key];
            }
        }
    }
    
    public choiceServerInfo(index:number):void
    {
        this.curServerInfo = this.serverList[index];
    }
    /**保存自己玩家数据 */
    public saveSelfPlayerData(data:any):void
    {
        this.loginAuthentication = data.authentication;
        this.selfPlayerData = new PlayerData();
        this.selfPlayerData.name = data.data;
    }

    public initData():void
    {
        
        //测试数据
        if(!this.selfPlayerData)
        {
            this.selfPlayerData = new PlayerData();
        }
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
        var ids:Array<string> = ["20005","20000","20002"];
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
        var ids:Array<string> = ["20001","20005","20002","20003","20004"];
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