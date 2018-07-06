var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 挑战boss界面
*/
var ChallegenBossMediator = /** @class */ (function (_super) {
    __extends(ChallegenBossMediator, _super);
    function ChallegenBossMediator(assetsUrl, view) {
        var _this = _super.call(this, assetsUrl, view) || this;
        _this.heroRoles = null;
        _this.enemyRoles = null;
        return _this;
    }
    ChallegenBossMediator.prototype.initView = function () {
        this.view = new ui.battle.ChallengeBossViewUI();
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, true, true);
        _super.prototype.initView.call(this);
        this.initRoles();
        GameConfig.BATTLE_ADDSPEED_TIMES = 1;
        this.view.btnTimes.label = "X" + GameConfig.BATTLE_ADDSPEED_TIMES;
        // EventManager.ins.dispatchEvent(EventManager.TEST_LIST_SCRALE_RENDER);
    };
    ChallegenBossMediator.prototype.addEvents = function () {
        this.view.btnFast.on(Laya.Event.CLICK, this, this.onBtnFast);
        this.view.btnTimes.on(Laya.Event.CLICK, this, this.onBtnTimes);
    };
    ChallegenBossMediator.prototype.removeEvents = function () {
        this.view.btnFast.off(Laya.Event.CLICK, this, this.onBtnFast);
        this.view.btnTimes.off(Laya.Event.CLICK, this, this.onBtnTimes);
    };
    /**初始化地图数据 */
    ChallegenBossMediator.prototype.initRoles = function () {
        BossBattleData.curLoadNum = 0;
        //英雄
        this.heroRoles = new Array();
        var playerData = GameDataManager.ins.selfPlayerData;
        playerData.upHeroVos.forEach(function (baseRoleVo) {
            baseRoleVo.initRowColPosPoint();
        });
        var baseRoleVo;
        var hero;
        for (var i = 0; i < playerData.upHeroVos.length; i++) {
            baseRoleVo = playerData.upHeroVos[i];
            hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
            hero.initRole(baseRoleVo, i, -1, this.view.sprRole, true);
            // hero.setBlood(0);
            hero.aniPlay(RoleAniIndex.STAND);
            this.heroRoles.push(hero);
        }
        //显示层级排序
        this.heroRoles.sort(function (hero1, hero2) {
            return hero1.baseRoleVo.gridY > hero2.baseRoleVo.gridY ? 1 : -1;
        });
        for (i = 0; i < this.heroRoles.length; i++) {
            this.heroRoles[i].setShowIndex(i);
        }
        //敌人
        this.enemyRoles = new Array();
        var bossData = GameDataManager.ins.bossData;
        //怪物显示对象
        var enemy;
        for (i = 0; i < bossData.masterVos.length; i++) {
            baseRoleVo = bossData.masterVos[i];
            enemy = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ENEMY_ROLE);
            enemy.initRole(baseRoleVo, i, 1, this.view.sprRole, true);
            enemy.aniPlay(RoleAniIndex.STAND);
            this.enemyRoles.push(enemy);
        }
        //显示层级排序
        this.enemyRoles.sort(function (enemy1, enemy2) {
            return enemy1.baseRoleVo.gridY > enemy2.baseRoleVo.gridY ? 1 : -1;
        });
        for (i = 0; i < this.enemyRoles.length; i++) {
            this.enemyRoles[i].setShowIndex(this.heroRoles.length + i);
        }
        BossBattleData.loadSum = this.heroRoles.length + this.enemyRoles.length;
        BattleEngine.ins.challegenBoss(this.heroRoles, this.enemyRoles);
    };
    /**
     * 快速结束
     * @param e
     */
    ChallegenBossMediator.prototype.onBtnFast = function (e) {
        BattleEngine.ins.challegenBossFastEnd();
        this.dispose();
    };
    ChallegenBossMediator.prototype.dispose = function () {
        SoundsManager.ins.playerMusicByEnum(MusicBGType.SHAM_BATTLE, 1000);
        /**清除角色对象 */
        if (this.heroRoles) {
            var lastHeros = [];
            this.heroRoles.forEach(function (role) {
                Laya.Tween.clearAll(role);
                role.baseRoleVo.isDeath = false;
                ObjectPoolUtil.stillObject(ObjectPoolUtil.HERO_ROLE, role);
                role.dispose();
            });
            this.heroRoles = null;
        }
        if (this.enemyRoles) {
            this.enemyRoles.forEach(function (role) {
                Laya.Tween.clearAll(role);
                ObjectPoolUtil.stillObject(ObjectPoolUtil.ENEMY_ROLE, role);
                role.dispose();
            });
            this.enemyRoles = null;
        }
        // BattleEngine.ins.endBattle();
        LayerManager.ins.removeToLayer(this.view, LayerManager.UI_LAYER, true, false);
    };
    ChallegenBossMediator.prototype.onBtnTimes = function (e) {
        GameConfig.BATTLE_ADDSPEED_TIMES++;
        if (GameConfig.BATTLE_ADDSPEED_TIMES > 3) {
            GameConfig.BATTLE_ADDSPEED_TIMES = 1;
        }
        this.view.btnTimes.label = "X" + GameConfig.BATTLE_ADDSPEED_TIMES;
    };
    return ChallegenBossMediator;
}(BaseMediator));
//# sourceMappingURL=ChallegenBossMediator.js.map