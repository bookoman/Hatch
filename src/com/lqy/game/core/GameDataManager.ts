/*
* 游戏数据管理器
*/
class GameDataManager{
     /**显示模块视图索引 */
    public static showModuleViewInd:number = -1;

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
    /**关卡信息数组 */
    public gateInfoDic:Dictionary = null;
    /**关卡地图开启信息 */
    public gateMapInfoObj:Object = null;
    /**当前挂机关卡 */
    public hangGateKey:string = null;
   
    
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
    /**保存开启关卡信息 */
    public saveGateInfoVoInfo(gateData):void
    {   
        this.gateMapInfoObj = {};

        this.hangGateKey = gateData.hangGateKey;
        if(this.gateInfoDic == null)
        {
            this.gateInfoDic = new Dictionary();
        }
        var gateInfoVo:GateInfoVo;
        var gateInfo;
        for (var key in gateData.gateInfoMap) {
            gateInfo = gateData.gateInfoMap[key];
            gateInfoVo = new GateInfoVo();
            gateInfoVo.gateKey = gateInfo.gateKey;
            gateInfoVo.gateMapKey = gateInfo.gateMapKey;
            gateInfoVo.passGate = gateInfo.passGate;
            gateInfoVo.passTime = gateInfo.passTime;
            this.gateInfoDic.set(key,gateInfoVo);
            this.gateMapInfoObj[gateInfoVo.gateMapKey] = true;
        }
        
    }
    
    /**
     * 得到对应地图块所有关卡
     * @param mapkey 
     */
    public getGatesByMapKey(mapkey:string):Array<GateInfoVo>
    {
        var ary:Array<GateInfoVo> = [];
        var gateInfoVo:GateInfoVo;
        for (var key in this.gateInfoDic) {
            gateInfoVo = this.gateInfoDic[key];
            if(gateInfoVo.gateMapKey == mapkey)
            {
                ary.push(gateInfoVo)
            }
        }
        return ary;
    }
    /**判断管卡是否开启 */
    public getGateMapIsOpen(mapKey:string):boolean
    {
        if(this.gateMapInfoObj[mapKey] === undefined || this.gateMapInfoObj[mapKey] == false)
        {
            return false;
        }
        return true;
    }
    public getGateInfoVo(gateKey:string):GateInfoVo
    {
        return this.gateInfoDic.get(gateKey);
    }
    /**保存服务器信息 */
    public saveServerInfoList(data:any,lastServer:any):void
    {
        /**上一次登录服务器信息 */
        this.curServerInfo = new ServerInfoVo();
        for (var key in lastServer) {
            if (lastServer.hasOwnProperty(key)) {
                this.curServerInfo[key] = lastServer[key];
            }
        }
        //服务器列表
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
            //默认选中第一个正常状态的服务器
            if(!this.curServerInfo.ip && serverInfo.state == GameServerState.GameServer_State_ON)
            {
                this.curServerInfo = serverInfo;
            }
            this.serverList.push(serverInfo);
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
    /**根据heroId得到heroVo */
    public getHeroVoByHeroId(heroId:string):HeroVo
    {
        var heroVo:HeroVo = this.selfPlayerData.heroVoDic.get(heroId);
        return heroVo;
    }
    /**假打生产敌人 */
    public produceEnemyData():void
    {
        //怪物数据
        this.enemyData = new EnemyData();
        this.enemyData.masterNPCVos = [];
        var gateSampleConfig:GateSampleConfig = ConfigManager.ins.getGateSampleConfig(this.hangGateKey);
        var keys:Array<string> = gateSampleConfig.getRandowHandUpMasters();
        // var keys:Array<string> = ["20001"];
        var masterNPCVo:MasterNPCVo;
        for(var i = 0;i < keys.length;i++)
        {
            masterNPCVo = new MasterNPCVo();
            masterNPCVo.lineupGrid = i;
            masterNPCVo.initBaseData(keys[i]);
            masterNPCVo.initRowColPosPoint();
            this.enemyData.masterNPCVos.push(masterNPCVo);
        }
        this.enemyData.masterNPCVos.sort(
            function(a:BaseRoleVo,b:BaseRoleVo):number{
                return a.speed > b.speed ? -1 : 1
            }
        );
        this.enemyData.enemySum = this.enemyData.masterNPCVos.length;
    }

    /**
     * 生产Boss数据
     */
    public productBossData():void
    {
        //怪物数据
        this.bossData = new EnemyData();
        this.bossData.masterVos = [];
        var gateSampleConfig:GateSampleConfig = ConfigManager.ins.getGateSampleConfig(this.hangGateKey);
        var keys:Array<string> = gateSampleConfig.getRandowHandUpMasters(5,true);
        var masterVo:MasterVo;
        for(var i = 0;i < keys.length;i++)
        {
            masterVo = new MasterVo();
            masterVo.lineupGrid = i;
            masterVo.initBaseData(keys[i]);
            masterVo.initRowColPosPoint();
            this.bossData.masterVos.push(masterVo);
        }
        this.bossData.masterVos.sort(
            function(a:BaseRoleVo,b:BaseRoleVo):number{
                return a.speed > b.speed ? -1 : 1
            }
        );
        this.bossData.enemySum = this.bossData.masterVos.length;
    }


    public resetRolePoint():void
    {
        if(this.selfPlayerData)
        {
            this.selfPlayerData.upHeroVos.forEach(heroVo => {
                heroVo.initRowColPosPoint();
            });
        }
        if(this.enemyData)
        {
            this.enemyData.masterNPCVos.forEach(masNPCVo => {
                masNPCVo.initRowColPosPoint();
            });

        }
    }
    /**计算角色再地图上坐标 */
    public calMapRowColPosPoint():void
    {
        if(!this.selfPlayerData.upHeroVos)
        {
            return;
        }
        this.selfPlayerData.upHeroVos.sort(
            function(a:BaseRoleVo,b:BaseRoleVo):number{
                return a.speed > b.speed ? -1 : 1
            }
        );
        this.selfPlayerData.upHeroVos.forEach(baseROleVo => {
            baseROleVo.initRowColPosPoint();
        });
    }

















    /**假战斗数据 */

    public initData():void
    {
        
        //测试数据
        if(!this.selfPlayerData)
        {
            this.selfPlayerData = new PlayerData();
        }
        this.selfPlayerData.id = 88888888;
        // this.selfPlayerData.name = "SimplePlan";
        // this.selfPlayerData.lineupId = "1";
        // var lineupposVoAry:Array<LineupPosVo> = LineupManager.ins.getCofingByID(this.selfPlayerData.lineupId);
        this.selfPlayerData.heroVoDic = new Dictionary();
        var keys:Array<string> = ["Hero_10001","Hero_10009","Hero_10017","Hero_10025","Hero_10033"];
        var heroVo:HeroVo;
        for(var i = 0;i < keys.length;i++)
        {
            // roleVo = ConfigManager.ins.getHeroSampleConfig(keys[i]);
            heroVo = new HeroVo();
            heroVo.heroKey = keys[i];
            heroVo.lineupGrid = i;
            heroVo.heroId = heroVo.heroKey + "_"+ heroVo.lineupGrid;
            heroVo.initBaseData();
            this.selfPlayerData.heroVoDic.set(heroVo.roleId,heroVo)
        }

        //阵型数据
        this.selfPlayerData.heroLineupDic = new Dictionary();
        var heroId:string;

        for(var i = 0;i < this.selfPlayerData.heroVoDic.values.length;i++)
        {
            heroVo = this.selfPlayerData.heroVoDic.values[i];
            this.selfPlayerData.heroLineupDic.set(heroVo.lineupGrid,heroVo.roleId);
            this.selfPlayerData.addUpHeroVo(heroVo.roleId,heroVo.lineupGrid);
        }
        this.selfPlayerData.heroSum = this.selfPlayerData.heroVoDic.values.length;
    }
    /**计算角色再地图上坐标 */
    // public calMapRowColPosPoint():void
    // {
    //     this.selfPlayerData.roleVoAry.sort(
    //         function(a:RoleVo,b:RoleVo):number{
    //             return a.atts > b.atts ? -1 : 1
    //         }
    //     );
    //     this.selfPlayerData.roleVoAry.forEach(roleVo => {
    //         roleVo.initRowColPosPoint();
    //     });
    // }

    /**生产敌人 */
    // public produceEnemyData():void
    // {
    //     //怪物数据
    //     this.enemyData = new EnemyData();
    //     this.enemyData.roleVoAry = [];
    //     var keys:Array<string> = ["20005","20000","20002"];
    //     //var keys:Array<string> = ["20001"];
    //     var roleVo:RoleVo;
    //     for(var i = 0;i < keys.length;i++)
    //     {
    //         roleVo = ConfigManager.ins.getRoleVoByID(keys[i]);
    //         if(roleVo)
    //         {
    //             roleVo.lineupGrid = i;
    //             roleVo.initRowColPosPoint();
    //             this.enemyData.roleVoAry.push(roleVo);
    //         }
    //     }
    //     this.enemyData.roleVoAry.sort(
    //         function(a:RoleVo,b:RoleVo):number{
    //             return a.atts > b.atts ? -1 : 1
    //         }
    //     );
    //     this.enemyData.enemySum = this.enemyData.roleVoAry.length;
    // }
    /**
     * 生产Boss数据
     */
    // public productBossData():void
    // {
    //     //怪物数据
    //     this.bossData = new EnemyData();
    //     this.bossData.roleVoAry = [];
    //     var keys:Array<string> = ["20001","20005","20002","20003","20004"];
    //     var roleVo:RoleVo;
    //     for(var i = 0;i < keys.length;i++)
    //     {
    //         roleVo = ConfigManager.ins.getRoleVoByID(keys[i]);
    //         if(roleVo)
    //         {
    //             roleVo.lineupGrid = i;
    //             roleVo.initRowColPosPoint();
    //             this.bossData.roleVoAry.push(roleVo);
    //         }
    //     }
    //     this.bossData.roleVoAry.sort(
    //         function(a:RoleVo,b:RoleVo):number{
    //             return a.atts > b.atts ? -1 : 1
    //         }
    //     );
    //     this.bossData.enemySum = this.bossData.roleVoAry.length;
    // }
    /**
     * 矫正角色坐标
     */
    // public resetRolePoint():void
    // {
    //     if(this.selfPlayerData)
    //     {
    //         this.selfPlayerData.roleVoAry.forEach(roleVo => {
    //             roleVo.initRowColPosPoint();
    //         });
    //     }
    //     if(this.enemyData)
    //     {
    //         this.enemyData.roleVoAry.forEach(roleVo => {
    //             roleVo.initRowColPosPoint();
    //         });

    //     }
    // }
}