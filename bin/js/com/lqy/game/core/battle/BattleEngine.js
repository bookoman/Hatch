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
        this.loopBattleEngine = new LoopBattleEngine();
        this.bossBattleEngine = new BossBattleEngine();
        //技能视图
        this.skillView = new SkillView();
        this.skillView.x = 10;
        this.skillView.y = 900;
        LayerManager.ins.addToLayer(this.skillView, LayerManager.UI_LAYER, false, false, false);
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
    BattleEngine.prototype.run = function () {
        Laya.timer.loop(1000, this, this.runUpdate);
    };
    /**更新 */
    BattleEngine.prototype.runUpdate = function () {
        if (!GameDataManager.ins.isChallengeBoss) {
            this.loopBattleEngine.runUpdate();
        }
        else {
            this.bossBattleEngine.runUpdate();
        }
    };
    /**循环假战斗 */
    BattleEngine.prototype.loopBattleRun = function () {
        GameDataManager.ins.resetRolePoint();
        this.loopBattleEngine.endBattle();
        this.loopBattleEngine.init();
    };
    /**挑战boss */
    BattleEngine.prototype.challegenBoss = function (herosAry, enemyAry) {
        // this.runtoBallte();
        //挑战boss
        GameDataManager.ins.isChallengeBoss = true;
        MapManager.ins.mapScrollSwitch = false;
        this.bossBattleEngine.startBattle(herosAry, enemyAry);
    };
    /**快速结束战斗 */
    BattleEngine.prototype.challegenBossFastEnd = function () {
        if (this.bossBattleEngine) {
            this.bossBattleEngine.endBattle();
        }
    };
    BattleEngine._ins = null;
    return BattleEngine;
}());
//# sourceMappingURL=BattleEngine.js.map