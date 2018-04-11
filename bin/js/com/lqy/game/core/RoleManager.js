/*
* 较色管理器
*/
var RoleManager = /** @class */ (function () {
    function RoleManager() {
        this.heroRoles = null;
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
            hero.initRole("res/outside/anim/hero/swordsman/SwordsMan.sk", 0.3, roleVo);
            this.heroRoles.push(hero);
        }
        this.enemyRoles = new Array();
        var enemyData = GameDataManager.ins.enemyData;
        var enemy;
        for (i = 0; i < enemyData.roleVoAry.length; i++) {
            roleVo = enemyData.roleVoAry[i];
            enemy = new Enemy();
            enemy.initRole("res/outside/anim/hero/demon/Demon.sk", 0.3, roleVo);
            this.enemyRoles.push(enemy);
        }
    };
    RoleManager.prototype.playAni = function (aniID) {
        this.heroRoles.forEach(function (hero) {
            hero.play(aniID);
        });
        this.enemyRoles.forEach(function (enemy) {
            enemy.play(aniID);
        });
    };
    RoleManager._ins = null;
    return RoleManager;
}());
//# sourceMappingURL=RoleManager.js.map