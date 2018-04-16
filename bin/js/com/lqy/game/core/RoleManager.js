/*
* 较色管理器
*/
var RoleManager = /** @class */ (function () {
    function RoleManager() {
        /**英雄角色 */
        this.heroRoles = null;
        /**敌人角色 */
        this.enemyRoles = null;
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
    RoleManager.prototype.initRoles = function () {
        this.heroRoles = new Array();
        var playerData = GameDataManager.ins.selfPlayerData;
        var roleVo;
        var hero;
        for (var i = 0; i < playerData.roleVoAry.length; i++) {
            roleVo = playerData.roleVoAry[i];
            hero = new Hero();
            hero.initRole(roleVo, 1);
            hero.aniPlay(RoleAniIndex.MOVE);
            this.heroRoles.push(hero);
        }
    };
    RoleManager.prototype.playAni = function (aniID) {
        if (this.heroRoles) {
            this.heroRoles.forEach(function (hero) {
                hero.aniPlay(aniID);
            });
        }
        if (this.enemyRoles) {
            this.enemyRoles.forEach(function (enemy) {
                enemy.aniPlay(aniID);
            });
        }
    };
    RoleManager.prototype.heroRun = function () {
        this.heroRoles.forEach(function (hero) {
            hero.run();
        });
    };
    RoleManager.prototype.enemyRun = function () {
        this.enemyRoles.forEach(function (enemy) {
            enemy.run();
        });
    };
    RoleManager.prototype.heroStand = function () {
        this.heroRoles.forEach(function (hero) {
            hero.aniPlay(RoleAniIndex.STAND);
        });
    };
    RoleManager._ins = null;
    return RoleManager;
}());
//# sourceMappingURL=RoleManager.js.map