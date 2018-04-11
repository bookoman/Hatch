/*
* 较色管理器
*/
var RoleManager = /** @class */ (function () {
    function RoleManager() {
        this.heroRoles = null;
        this.monsterRoles = null;
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
        this.monsterRoles = new Array();
        var lineupVoAry = LineupManager.ins.getCofingByID("1");
        var hero;
        var lineupVo;
        for (var i = 0; i < lineupVoAry.length; i++) {
            lineupVo = lineupVoAry[i];
            hero = new Hero();
            hero.initRole("res/outside/anim/hero/swordsman/SwordsMan.sk", 0.3, lineupVo);
            this.heroRoles.push(hero);
        }
        lineupVoAry = LineupManager.ins.getCofingByID("2");
        var monster;
        for (i = 0; i < lineupVoAry.length; i++) {
            lineupVo = lineupVoAry[i];
            monster = new Monster();
            monster.initRole("res/outside/anim/hero/demon/Demon.sk", 0.3, lineupVo);
            this.monsterRoles.push(monster);
        }
    };
    RoleManager.prototype.playAni = function (aniID) {
        this.heroRoles.forEach(function (hero) {
            hero.play(aniID);
        });
        this.monsterRoles.forEach(function (monster) {
            monster.play(aniID);
        });
    };
    RoleManager._ins = null;
    return RoleManager;
}());
//# sourceMappingURL=RoleManager.js.map