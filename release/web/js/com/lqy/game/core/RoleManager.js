/*
* 较色管理器
*/
var RoleManager = /** @class */ (function () {
    function RoleManager() {
        /**英雄角色 */
        this.heroRoles = null;
        /**敌人角色 */
        this.enemyRoles = null;
        /**敌人 */
        this.enemyRunCount = 0;
        /**英雄 */
        this.heroRunCount = 0;
    }
    Object.defineProperty(RoleManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new RoleManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    RoleManager.prototype.initHeros = function () {
        // this.clearRole();
        if (this.heroRoles == null) {
            this.heroRoles = new Array();
        }
        var playerData = GameDataManager.ins.selfPlayerData;
        var roleVo;
        var hero;
        for (var i = 0; i < playerData.roleVoAry.length; i++) {
            roleVo = playerData.roleVoAry[i];
            hero = null;
            this.heroRoles.forEach(function (heroView) {
                if (heroView.roleVo.id == roleVo.id) {
                    hero = heroView;
                    hero.setBlood(0);
                }
            });
            if (hero == null) {
                hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
                hero.initRole(roleVo, i, 1);
                this.heroRoles.push(hero);
            }
            hero.aniPlay(RoleAniIndex.MOVE);
        }
        this.heroRoles.forEach(function (heroView) {
            heroView.setShowIndex(heroView.roleVo.lineupGrid - 1);
        });
    };
    /**
     * 重置角色坐标
     */
    RoleManager.prototype.resetRolePoint = function () {
        this.heroRoles.forEach(function (heroView) {
            Laya.Tween.to(heroView, { x: heroView.roleVo.posPoint.x, y: heroView.roleVo.posPoint.y }, 200);
        });
    };
    /**生产敌人 */
    RoleManager.prototype.produceEnemy = function () {
        var _this = this;
        //怪物数据
        var enemyData = GameDataManager.ins.enemyData;
        this.enemyRoles = new Array();
        //怪物显示对象
        var enemy;
        var roleVo;
        for (var i = 0; i < enemyData.roleVoAry.length; i++) {
            roleVo = enemyData.roleVoAry[i];
            enemy = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ENEMY_ROLE);
            enemy.initRole(roleVo, i, 1);
            this.enemyRoles.push(enemy);
            enemy.aniPlay(RoleAniIndex.STAND);
        }
        this.enemyRoles.forEach(function (enemyView) {
            enemyView.setShowIndex(_this.heroRoles.length + enemyView.roleVo.lineupGrid - 1);
        });
    };
    /**
     * 英雄移动
     */
    RoleManager.prototype.heroRun = function () {
        this.heroRoles.forEach(function (hero) {
            hero.run();
        });
    };
    /**
     * 英雄站立
     */
    RoleManager.prototype.heroStand = function () {
        this.heroRoles.forEach(function (hero) {
            hero.aniPlay(RoleAniIndex.STAND);
        });
    };
    /**
     * 敌人移动
     */
    RoleManager.prototype.enemyRun = function () {
        this.enemyRoles.forEach(function (enemy) {
            enemy.run();
        });
    };
    /**
     * 敌人跟随地图移动
     * @param speed
     */
    RoleManager.prototype.enemyMoveByMap = function (speed) {
        if (this.enemyRoles) {
            this.enemyRoles.forEach(function (enemy) {
                enemy.moveByMap(speed);
            });
        }
    };
    /**清除舞台显示对象 */
    RoleManager.prototype.clearRole = function () {
        if (this.heroRoles) {
            var lastHeros = [];
            this.heroRoles.forEach(function (role) {
                role.roleVo.isDeath = false;
                Laya.Tween.clearAll(role);
                //只移除死掉英雄
                if (role.roleVo.isDeath) {
                    ObjectPoolUtil.stillObject(ObjectPoolUtil.HERO_ROLE, role);
                    role.dispose();
                }
                else {
                    lastHeros.push(role);
                }
            });
            this.heroRoles = lastHeros;
        }
        if (this.enemyRoles) {
            this.enemyRoles.forEach(function (role) {
                Laya.Tween.clearAll(role);
                ObjectPoolUtil.stillObject(ObjectPoolUtil.ENEMY_ROLE, role);
                role.dispose();
            });
            this.enemyRoles = null;
        }
    };
    RoleManager._ins = null;
    return RoleManager;
}());
//# sourceMappingURL=RoleManager.js.map