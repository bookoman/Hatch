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
    GameDataManager.prototype.initData = function () {
        //测试数据
        this.selfPlayerData = new PlayerData();
        this.selfPlayerData.id = 88888888;
        this.selfPlayerData.name = "SimplePlan";
        // this.selfPlayerData.lineupId = "1";
        // var lineupposVoAry:Array<LineupPosVo> = LineupManager.ins.getCofingByID(this.selfPlayerData.lineupId);
        this.selfPlayerData.roleVoAry = [];
        var ids = ["10000", "10001", "10005", "10002", "10003", "10004"];
        var roleVo;
        for (var i = 0; i < ids.length; i++) {
            roleVo = ConfigManager.ins.getRoleVoByID(ids[i]);
            if (roleVo) {
                roleVo.lineupGrid = i + 1;
                roleVo.initRowColPosPoint();
                this.selfPlayerData.roleVoAry.push(roleVo);
            }
        }
        this.selfPlayerData.roleVoAry.sort(function (a, b) {
            return a.atts > b.atts ? -1 : 1;
        });
        this.selfPlayerData.heroSum = this.selfPlayerData.roleVoAry.length;
    };
    /**生产敌人 */
    GameDataManager.prototype.produceEnemyData = function () {
        //怪物数据
        this.enemyData = new EnemyData();
        this.enemyData.roleVoAry = [];
        var ids = ["20001", "20000", "20002"];
        // var ids:Array<string> = ["20001"];
        var roleVo;
        for (var i = 0; i < ids.length; i++) {
            roleVo = ConfigManager.ins.getRoleVoByID(ids[i]);
            if (roleVo) {
                roleVo.lineupGrid = i + 1;
                roleVo.initRowColPosPoint();
                this.enemyData.roleVoAry.push(roleVo);
            }
        }
        this.enemyData.roleVoAry.sort(function (a, b) {
            return a.atts > b.atts ? -1 : 1;
        });
        this.enemyData.enemySum = this.enemyData.roleVoAry.length;
    };
    /**
     * 生产Boss数据
     */
    GameDataManager.prototype.productBossData = function () {
        //怪物数据
        this.bossData = new EnemyData();
        this.bossData.roleVoAry = [];
        var ids = ["20001", "20000", "20002", "20003", "20004"];
        var roleVo;
        for (var i = 0; i < ids.length; i++) {
            roleVo = ConfigManager.ins.getRoleVoByID(ids[i]);
            if (roleVo) {
                roleVo.lineupGrid = i + 1;
                roleVo.initRowColPosPoint();
                this.bossData.roleVoAry.push(roleVo);
            }
        }
        this.bossData.roleVoAry.sort(function (a, b) {
            return a.atts > b.atts ? -1 : 1;
        });
        this.bossData.enemySum = this.bossData.roleVoAry.length;
    };
    /**
     * 矫正角色坐标
     */
    GameDataManager.prototype.resetRolePoint = function () {
        if (this.selfPlayerData) {
            this.selfPlayerData.roleVoAry.forEach(function (roleVo) {
                roleVo.initRowColPosPoint();
            });
        }
        if (this.enemyData) {
            this.enemyData.roleVoAry.forEach(function (roleVo) {
                roleVo.initRowColPosPoint();
            });
        }
    };
    GameDataManager._ins = null;
    return GameDataManager;
}());
//# sourceMappingURL=GameDataManager.js.map