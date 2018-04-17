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
    RoleManager.prototype.initHeors = function () {
        this.clearRole();
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
    /**生产敌人 */
    RoleManager.prototype.produceEnemy = function () {
        //怪物数据
        var enemyData = GameDataManager.ins.enemyData;
        //怪物显示对象
        var enemyRoles = new Array();
        var enemy;
        var roleVo;
        for (var i = 0; i < enemyData.roleVoAry.length; i++) {
            roleVo = enemyData.roleVoAry[i];
            enemy = new Enemy();
            enemy.initRole(roleVo, 1);
            enemyRoles.push(enemy);
        }
        RoleManager.ins.enemyRoles = enemyRoles;
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
     * 战斗
     * @param attRoleVo
     * @param defRoleVo
     */
    RoleManager.prototype.battleAtt = function (attRoleVo, defRoleVo) {
        var _this = this;
        var tempAry = this.heroRoles.concat(this.enemyRoles);
        tempAry.forEach(function (roleView) {
            if (roleView.roleVo.id == attRoleVo.id) {
                _this.attRole = roleView;
            }
            else if (roleView.roleVo.id == defRoleVo.id) {
                _this.defRole = roleView;
            }
        });
        if (this.attRole && this.defRole) {
            this.attRole.aniPlay(RoleAniIndex.MOVE);
            Laya.Tween.to(this.attRole, { x: defRoleVo.posPoint.x - 50, y: defRoleVo.posPoint.y }, GameConfig.BATTLE_ATT_TIME * 1000, null, new Handler(this, this.moveCompleteAtt, [attRoleVo, defRoleVo]));
        }
    };
    RoleManager.prototype.moveCompleteAtt = function (data) {
        if (this.attRole && this.defRole) {
            this.attRole.aniPlay(RoleAniIndex.ATTACK);
            var attRoleVo = this.attRole.roleVo;
            var defRoleVo = this.defRole.roleVo;
            BattleDataManager.ins.calculationAttribute();
            if (defRoleVo.isDeath) {
                this.defRole.aniPlay(RoleAniIndex.DEATH);
                this.defRole.setVisible(false);
            }
            else {
                this.defRole.aniPlay(RoleAniIndex.INJURED);
            }
            Laya.Tween.to(this.attRole, { x: attRoleVo.posPoint.x, y: attRoleVo.posPoint.y }, GameConfig.BATTLE_ATT_TIME * 1000, null, new Handler(this, this.moveBackComplete));
        }
    };
    RoleManager.prototype.moveBackComplete = function () {
        this.attRole.aniPlay(RoleAniIndex.STAND);
        this.defRole.aniPlay(RoleAniIndex.STAND);
        EventManager.ins.dispatchEvent(EventManager.ENEMY_ATT_COMPLETE);
    };
    RoleManager.prototype.clearRole = function () {
        if (this.heroRoles) {
            this.heroRoles.forEach(function (role) {
                role.dispose();
            });
            this.heroRoles = null;
        }
        if (this.enemyRoles) {
            this.enemyRoles.forEach(function (role) {
                role.dispose();
            });
            this.enemyRoles = null;
        }
    };
    RoleManager._ins = null;
    return RoleManager;
}());
//# sourceMappingURL=RoleManager.js.map