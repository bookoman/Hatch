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
        this.battleDataMgr = BattleDataManager.ins;
        this.roleMgr = RoleManager.ins;
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
        this.timeCount = 0;
        this.battleTimeInterval = GameConfig.BATTLE_INTERVAL_TIME;
        Laya.timer.loop(1000, this, this.runUpdate);
    };
    /**更新 */
    BattleEngine.prototype.runUpdate = function () {
        if (GameConfig.SCENE_BATTLE_SWITCH) {
            // console.log("................"+this.timeCount);
            //场景战斗开关
            this.timeCount++;
            if (this.timeCount == this.battleTimeInterval) {
                this.enemyRuntoBallte();
                // this.heroRuntoBattle();
            }
        }
        this.battleDataMgr.runRoleSkillCD();
    };
    // /**
    //  * 敌人跑去战斗
    //  */
    // private enemyRuntoBallte():void
    // {
    //     MapManager.ins.enemyMoveSwitch = true;
    //     GameDataManager.ins.produceEnemyData();
    //     this.roleMgr.produceEnemy();
    //     this.battleDataMgr.initData();
    //     EventManager.ins.addEvent(EventManager.ENEMY_RUNTO_COMPLETE,this,this.onEnemyRunComplete);
    // }
    // private onEnemyRunComplete():void
    // {
    //     this.roleMgr.enemyRunCount++;
    //     if(this.roleMgr.enemyRunCount >= GameDataManager.ins.enemyData.enemySum)
    //     {
    //         this.roleMgr.enemyRunCount = 0;
    //         EventManager.ins.removeEvent(EventManager.ENEMY_RUNTO_COMPLETE,this.onEnemyRunComplete);
    //         this.startBattle();
    //     }
    // }
    /**
     * 敌人跑去战斗
     */
    BattleEngine.prototype.enemyRuntoBallte = function () {
        MapManager.ins.enemyMoveSwitch = true;
        GameDataManager.ins.produceEnemyData();
        this.roleMgr.produceEnemy();
        this.battleDataMgr.initData();
        EventManager.ins.addEvent(EventManager.ENEMY_RUNTO_COMPLETE, this, this.onEnemyRunComplete);
    };
    BattleEngine.prototype.onEnemyRunComplete = function () {
        EventManager.ins.removeEvent(EventManager.ENEMY_RUNTO_COMPLETE, this.onEnemyRunComplete);
        MapManager.ins.enemyMoveSwitch = true;
        this.startBattle();
    };
    /**开始战斗 */
    BattleEngine.prototype.startBattle = function () {
        MapManager.ins.mapScrollSwitch = false;
        this.roleMgr.heroStand();
        this.attack();
        EventManager.ins.addEvent(EventManager.ENEMY_ATT_COMPLETE, this, this.attCompleted);
    };
    BattleEngine.prototype.attack = function () {
        this.battleDataMgr.startAtt();
        this.skillView.init(this.battleDataMgr.curAttRoleVo.skillVos);
        this.roleMgr.battleAtt(this.battleDataMgr.curAttRoleVo, this.battleDataMgr.curDefRoleVo);
        // console.log("战斗，防御："+this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
    };
    BattleEngine.prototype.attCompleted = function () {
        // this.battleDataMgr.calculationAttribute();
        if (this.battleDataMgr.isEnd) {
            this.endBattle();
        }
        else {
            this.attack();
        }
    };
    /**结束战斗 */
    BattleEngine.prototype.endBattle = function () {
        EventManager.ins.removeEvent(EventManager.ENEMY_ATT_COMPLETE, this.attCompleted);
        this.timeCount = 0;
        MapManager.ins.mapScrollSwitch = true;
        this.battleDataMgr.isEnd = false;
        this.roleMgr.clearRole();
        this.roleMgr.initHeros();
        if (GameDataManager.ins.isChallengeBoss) {
            GameDataManager.ins.isChallengeBoss = false;
            GameConfig.SCENE_BATTLE_SWITCH = true;
            MapManager.ins.backLoopMap();
            EventManager.ins.dispatchEvent(EventManager.CHALLENGE_BOSS, [true]);
        }
    };
    /**挑战boss */
    BattleEngine.prototype.challegenBoss = function () {
        this.endBattle();
        // this.runtoBallte();
        GameDataManager.ins.isChallengeBoss = true;
        GameConfig.SCENE_BATTLE_SWITCH = false;
    };
    BattleEngine._ins = null;
    return BattleEngine;
}());
//# sourceMappingURL=BattleEngine.js.map