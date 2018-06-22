/*
* 游戏数据管理器
*/
var GameDataManager = /** @class */ (function () {
    function GameDataManager() {
        this.selfPlayerData = null;
        this.enemyData = null;
        this.bossData = null;
        /**是否再挑战boss */
        this.isChallengeBoss = false;
        /**关卡信息数组 */
        this.gateInfoDic = null;
        /**关卡地图开启信息 */
        this.gateMapInfoObj = null;
        /**当前挂机关卡 */
        this.hangGateKey = null;
    }
    Object.defineProperty(GameDataManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new GameDataManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**保存开启关卡信息 */
    GameDataManager.prototype.saveGateInfoVoInfo = function (gateData) {
        this.gateMapInfoObj = {};
        this.hangGateKey = gateData.hangGateKey;
        if (this.gateInfoDic == null) {
            this.gateInfoDic = new Dictionary();
        }
        var gateInfoVo;
        var gateInfo;
        for (var key in gateData.gateInfoMap) {
            gateInfo = gateData.gateInfoMap[key];
            gateInfoVo = new GateInfoVo();
            gateInfoVo.gateKey = gateInfo.gateKey;
            gateInfoVo.gateMapKey = gateInfo.gateMapKey;
            gateInfoVo.passGate = gateInfo.passGate;
            gateInfoVo.passTime = gateInfo.passTime;
            this.gateInfoDic.set(key, gateInfoVo);
            this.gateMapInfoObj[gateInfoVo.gateMapKey] = true;
        }
    };
    /**
     * 得到对应地图块所有关卡
     * @param mapkey
     */
    GameDataManager.prototype.getGatesByMapKey = function (mapkey) {
        var ary = [];
        var gateInfoVo;
        for (var key in this.gateInfoDic) {
            gateInfoVo = this.gateInfoDic[key];
            if (gateInfoVo.gateMapKey == mapkey) {
                ary.push(gateInfoVo);
            }
        }
        return ary;
    };
    /**判断管卡是否开启 */
    GameDataManager.prototype.getGateMapIsOpen = function (mapKey) {
        if (this.gateMapInfoObj[mapKey] === undefined || this.gateMapInfoObj[mapKey] == false) {
            return false;
        }
        return true;
    };
    GameDataManager.prototype.getGateInfoVo = function (gateKey) {
        return this.gateInfoDic.get(gateKey);
    };
    /**保存服务器信息 */
    GameDataManager.prototype.saveServerInfoList = function (data, lastServer) {
        /**上一次登录服务器信息 */
        this.curServerInfo = new ServerInfoVo();
        for (var key in lastServer) {
            if (lastServer.hasOwnProperty(key)) {
                this.curServerInfo[key] = lastServer[key];
            }
        }
        //服务器列表
        this.serverList = new Array();
        var info;
        var serverInfo;
        for (var i = 0; i < data.length; i++) {
            info = data[i];
            serverInfo = new ServerInfoVo();
            for (var key in info) {
                if (info.hasOwnProperty(key)) {
                    serverInfo[key] = info[key];
                }
            }
            //默认选中第一个正常状态的服务器
            if (!this.curServerInfo.ip && serverInfo.state == GameServerState.GameServer_State_ON) {
                this.curServerInfo = serverInfo;
            }
            this.serverList.push(serverInfo);
        }
    };
    GameDataManager.prototype.choiceServerInfo = function (index) {
        this.curServerInfo = this.serverList[index];
    };
    /**保存自己玩家数据 */
    GameDataManager.prototype.saveSelfPlayerData = function (data) {
        this.loginAuthentication = data.authentication;
        this.selfPlayerData = new PlayerData();
        this.selfPlayerData.name = data.data;
    };
    /**根据heroId得到heroVo */
    GameDataManager.prototype.getHeroVoByHeroId = function (heroId) {
        var heroVo = this.selfPlayerData.heroVoDic.get(heroId);
        return heroVo;
    };
    /**假打生产敌人 */
    GameDataManager.prototype.produceEnemyData = function () {
        //怪物数据
        this.enemyData = new EnemyData();
        this.enemyData.masterNPCVos = [];
        var gateSampleConfig = ConfigManager.ins.getGateSampleConfig(this.hangGateKey);
        var keys = gateSampleConfig.getRandowHandUpMasters();
        // var keys:Array<string> = ["20001"];
        var masterNPCVo;
        for (var i = 0; i < keys.length; i++) {
            masterNPCVo = new MasterNPCVo();
            masterNPCVo.lineupGrid = i;
            masterNPCVo.initBaseData(keys[i]);
            masterNPCVo.initRowColPosPoint();
            this.enemyData.masterNPCVos.push(masterNPCVo);
        }
        this.enemyData.masterNPCVos.sort(function (a, b) {
            return a.speed > b.speed ? -1 : 1;
        });
        this.enemyData.enemySum = this.enemyData.masterNPCVos.length;
    };
    /**
     * 生产Boss数据
     */
    GameDataManager.prototype.productBossData = function () {
        //怪物数据
        this.bossData = new EnemyData();
        this.bossData.masterVos = [];
        var gateSampleConfig = ConfigManager.ins.getGateSampleConfig(this.hangGateKey);
        var keys = gateSampleConfig.getRandowHandUpMasters(5);
        var masterVo;
        for (var i = 0; i < keys.length; i++) {
            masterVo = new MasterVo();
            masterVo.lineupGrid = i;
            masterVo.initBaseData(keys[i]);
            masterVo.initRowColPosPoint();
            this.bossData.masterVos.push(masterVo);
        }
        this.bossData.masterVos.sort(function (a, b) {
            return a.speed > b.speed ? -1 : 1;
        });
        this.bossData.enemySum = this.bossData.masterVos.length;
    };
    GameDataManager.prototype.resetRolePoint = function () {
        if (this.selfPlayerData) {
            this.selfPlayerData.upHeroVos.forEach(function (heroVo) {
                heroVo.initRowColPosPoint();
            });
        }
        if (this.enemyData) {
            this.enemyData.masterNPCVos.forEach(function (masNPCVo) {
                masNPCVo.initRowColPosPoint();
            });
        }
    };
    /**计算角色再地图上坐标 */
    GameDataManager.prototype.calMapRowColPosPoint = function () {
        if (!this.selfPlayerData.upHeroVos) {
            return;
        }
        this.selfPlayerData.upHeroVos.sort(function (a, b) {
            return a.speed > b.speed ? -1 : 1;
        });
        this.selfPlayerData.upHeroVos.forEach(function (baseROleVo) {
            baseROleVo.initRowColPosPoint();
        });
    };
    GameDataManager._ins = null;
    return GameDataManager;
}());
//# sourceMappingURL=GameDataManager.js.map