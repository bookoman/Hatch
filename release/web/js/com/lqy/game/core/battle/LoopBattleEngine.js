/*
* 循环假战斗场景
*/
var LoopBattleEngine = /** @class */ (function () {
    function LoopBattleEngine() {
        this.timeCount = 0;
        this.battleTimeInterval = 0;
        this.heros = null;
        this.enemies = null;
        this.loopBattleData = null;
        this.init();
    }
    LoopBattleEngine.prototype.init = function () {
        this.roleMgr = RoleManager.ins;
        this.timeCount = 0;
        this.battleTimeInterval = GameConfig.BATTLE_INTERVAL_TIME;
        this.loopBattleData = new LoopBattleData();
    };
    LoopBattleEngine.prototype.runUpdate = function () {
        if (GameConfig.SCENE_BATTLE_SWITCH) {
            // console.log("................"+this.timeCount);
            //场景战斗开关
            this.timeCount++;
            if (this.timeCount == this.battleTimeInterval) {
                this.enemyRuntoBallte();
                // this.heroRuntoBattle();
            }
        }
        this.loopBattleData.runRoleSkillCD();
    };
    /**
     * 敌人跑去战斗
     */
    LoopBattleEngine.prototype.enemyRuntoBallte = function () {
        MapManager.ins.enemyMoveSwitch = true;
        GameDataManager.ins.produceEnemyData();
        this.roleMgr.produceEnemy();
        this.loopBattleData.initData();
        EventManager.ins.addEvent(EventManager.ENEMY_RUNTO_COMPLETE, this, this.onEnemyRunComplete);
    };
    LoopBattleEngine.prototype.onEnemyRunComplete = function () {
        EventManager.ins.removeEvent(EventManager.ENEMY_RUNTO_COMPLETE, this.onEnemyRunComplete);
        MapManager.ins.enemyMoveSwitch = true;
        this.startBattle();
    };
    /**开始战斗 */
    LoopBattleEngine.prototype.startBattle = function () {
        MapManager.ins.mapScrollSwitch = false;
        this.roleMgr.heroStand();
        this.attack();
        EventManager.ins.addEvent(EventManager.ENEMY_ATT_COMPLETE, this, this.attCompleted);
    };
    LoopBattleEngine.prototype.attack = function () {
        this.loopBattleData.startAtt();
        this.roleMgr.battleAtt(this.loopBattleData.curAttRoleVo, this.loopBattleData.curDefRoleVo);
        // console.log("战斗，防御："+this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
    };
    LoopBattleEngine.prototype.attCompleted = function () {
        // this.battleDataMgr.calculationAttribute();
        if (this.loopBattleData.isEnd) {
            this.endBattle();
        }
        else {
            this.attack();
        }
    };
    /**结束战斗 */
    LoopBattleEngine.prototype.endBattle = function () {
        EventManager.ins.removeEvent(EventManager.ENEMY_ATT_COMPLETE, this.attCompleted);
        this.timeCount = 0;
        MapManager.ins.mapScrollSwitch = true;
        this.loopBattleData.isEnd = false;
        this.roleMgr.clearRole();
        this.roleMgr.initHeros();
        if (GameDataManager.ins.isChallengeBoss) {
            GameDataManager.ins.isChallengeBoss = false;
            GameConfig.SCENE_BATTLE_SWITCH = true;
            MapManager.ins.backLoopMap();
            EventManager.ins.dispatchEvent(EventManager.CHALLENGE_BOSS, [true]);
        }
    };
    return LoopBattleEngine;
}());
//# sourceMappingURL=LoopBattleEngine.js.map