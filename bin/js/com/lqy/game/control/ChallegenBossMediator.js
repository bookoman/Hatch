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
        this.view = new ui.ChallengeBossViewUI();
        this.roleLayer = new Laya.Sprite();
        this.view.addChild(this.roleLayer);
        LayerManager.ins.addToLayer(this.view, LayerManager.UI_LAYER, false, true, true);
        _super.prototype.initView.call(this);
        this.initRoles();
    };
    ChallegenBossMediator.prototype.addEvents = function () {
        this.view.btnFast.on(Laya.Event.CLICK, this, this.onBtnFast);
    };
    ChallegenBossMediator.prototype.removeEvents = function () {
        this.view.btnFast.off(Laya.Event.CLICK, this, this.onBtnFast);
    };
    /**初始化地图数据 */
    ChallegenBossMediator.prototype.initRoles = function () {
        var _this = this;
        BossBattleData.curLoadNum = 0;
        //英雄
        this.heroRoles = new Array();
        var playerData = GameDataManager.ins.selfPlayerData;
        playerData.roleVoAry.forEach(function (roleVo) {
            roleVo.initRowColPosPoint();
        });
        var roleVo;
        var hero;
        for (var i = 0; i < playerData.roleVoAry.length; i++) {
            roleVo = playerData.roleVoAry[i];
            hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
            hero.initRole(roleVo, i, 1, this.roleLayer);
            // hero.setBlood(0);
            hero.aniPlay(RoleAniIndex.STAND);
            this.heroRoles.push(hero);
        }
        this.heroRoles.forEach(function (heroView) {
            heroView.setShowIndex(heroView.roleVo.lineupGrid - 1);
        });
        //敌人
        this.enemyRoles = new Array();
        var bossData = GameDataManager.ins.bossData;
        //怪物显示对象
        var enemy;
        for (i = 0; i < bossData.roleVoAry.length; i++) {
            roleVo = bossData.roleVoAry[i];
            enemy = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ENEMY_ROLE);
            enemy.initRole(roleVo, i, 1, this.roleLayer);
            enemy.aniPlay(RoleAniIndex.STAND);
            this.enemyRoles.push(enemy);
        }
        this.enemyRoles.forEach(function (enemyView) {
            enemyView.setShowIndex(_this.heroRoles.length + enemyView.roleVo.lineupGrid - 1);
        });
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
        /**清除角色对象 */
        if (this.heroRoles) {
            var lastHeros = [];
            this.heroRoles.forEach(function (role) {
                Laya.Tween.clearAll(role);
                role.roleVo.isDeath = false;
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
    return ChallegenBossMediator;
}(BaseMediator));
//# sourceMappingURL=ChallegenBossMediator.js.map