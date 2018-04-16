/*
* 战斗引擎
* 一，阵型，站定九宫格，分三排、三列，每排3个位置，格子定位坐标
* 二，寻找攻击对象，普攻攻击同一排最前一个敌人，技能可以攻击后排或者一列一个或者多个敌人
* 三，发动攻击，近战攻击移到敌人身边攻击，远战攻击原地攻击
* 四，血量计算(测试) hp -= att
* 五，结束战斗，玩家胜利，玩家失败，清理战场，移除角色显示对象
*/
var BattleEngine = /** @class */ (function () {
    function BattleEngine() {
    }
    Object.defineProperty(BattleEngine, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new BattleEngine();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    BattleEngine.prototype.addEvents = function () {
    };
    BattleEngine.prototype.removeEvents = function () {
    };
    BattleEngine.prototype.onRunComplete = function (data) {
        this.enemyAI.enemyRunCount++;
        if (this.enemyAI.enemyRunCount >= GameDataManager.ins.enemyData.enemySum) {
            this.enemyAI.enemyRunCount = 0;
            EventManager.ins.removeEvent(EventManager.ENEMY_RUNTO_COMPLETE, this.onRunComplete);
            this.startBattle();
        }
    };
    BattleEngine.prototype.run = function () {
        this.timeCount = 0;
        this.battleTimeInterval = GameConfig.BATTLE_INTERVAL_TIME;
        this.HeroAI = new HeroAI();
        this.enemyAI = new EnemyAI();
        Laya.timer.loop(1000, this, this.runUpdate);
    };
    BattleEngine.prototype.runUpdate = function () {
        this.timeCount++;
        if (this.timeCount == this.battleTimeInterval) {
            this.rutoBallte();
        }
    };
    /**
     * 跑去战斗
     */
    BattleEngine.prototype.rutoBallte = function () {
        this.enemyAI.produceEnemy();
        this.enemyAI.runToLineup();
        this.battleData = new BattleData();
        EventManager.ins.addEvent(EventManager.ENEMY_RUNTO_COMPLETE, this, this.onRunComplete);
    };
    /**开始战斗 */
    BattleEngine.prototype.startBattle = function () {
        MapManager.ins.mapScrollSwitch = false;
        RoleManager.ins.heroStand();
    };
    /**结束战斗 */
    BattleEngine.prototype.endBattle = function () {
        this.timeCount = 0;
        MapManager.ins.mapScrollSwitch = true;
        RoleManager.ins.heroRun();
    };
    BattleEngine._ins = null;
    return BattleEngine;
}());
//# sourceMappingURL=BattleEngine.js.map