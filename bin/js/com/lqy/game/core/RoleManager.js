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
    /**初始化角色 */
    RoleManager.prototype.initHeros = function () {
        if (this.heroRoles == null) {
            this.heroRoles = new Array();
        }
        var playerData = GameDataManager.ins.selfPlayerData;
        var heroVo;
        var hero;
        if (!playerData.upHeroVos) {
            console.log("请上阵英雄");
            return;
        }
        for (var i = 0; i < playerData.upHeroVos.length; i++) {
            heroVo = playerData.upHeroVos[i];
            hero = null;
            this.heroRoles.forEach(function (heroView) {
                if (heroView.baseRoleVo.roleId == heroVo.roleId) {
                    hero = heroView;
                    hero.setBlood(0);
                }
            });
            if (hero == null) {
                hero = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.HERO_ROLE);
                hero.initRole(heroVo, i, 1);
                this.heroRoles.push(hero);
            }
            hero.aniPlay(RoleAniIndex.MOVE);
        }
        //显示层级排序
        this.heroRoles.sort(function (hero1, hero2) {
            return hero1.baseRoleVo.gridY > hero2.baseRoleVo.gridY ? 1 : -1;
        });
        for (i = 0; i < this.heroRoles.length; i++) {
            this.heroRoles[i].setShowIndex(i);
        }
    };
    /**
     * 重置角色坐标
     */
    RoleManager.prototype.resetRolePoint = function () {
        this.heroRoles.forEach(function (heroView) {
            Laya.Tween.to(heroView, { x: heroView.baseRoleVo.posPoint.x, y: heroView.baseRoleVo.posPoint.y }, 200);
        });
    };
    /**生产敌人 */
    RoleManager.prototype.produceEnemy = function () {
        //怪物数据
        var enemyData = GameDataManager.ins.enemyData;
        this.enemyRoles = new Array();
        //怪物显示对象
        var enemy;
        var masterNPCVo;
        for (var i = 0; i < enemyData.masterNPCVos.length; i++) {
            masterNPCVo = enemyData.masterNPCVos[i];
            enemy = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.ENEMY_ROLE);
            enemy.initRole(masterNPCVo, i, 1);
            this.enemyRoles.push(enemy);
            enemy.aniPlay(RoleAniIndex.STAND);
        }
        //显示层级排序
        this.enemyRoles.sort(function (enemy1, enemy2) {
            return enemy1.baseRoleVo.gridY > enemy2.baseRoleVo.gridY ? 1 : -1;
        });
        for (i = 0; i < this.enemyRoles.length; i++) {
            this.enemyRoles[i].setShowIndex(this.heroRoles.length + i);
        }
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
                role.baseRoleVo.isDeath = false;
                Laya.Tween.clearAll(role);
                //只移除死掉英雄
                if (role.baseRoleVo.isDeath) {
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