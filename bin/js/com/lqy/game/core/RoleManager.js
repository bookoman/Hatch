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
                if (i == 2) {
                    hero.initRole(roleVo, i, 2);
                }
                else {
                    hero.initRole(roleVo, i, 1);
                }
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
        }
        this.enemyRoles.forEach(function (enemyView) {
            enemyView.setShowIndex(enemyView.roleVo.lineupGrid - 1);
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
     * 战斗
     * @param attRoleVo
     * @param defRoleVo
     */
    RoleManager.prototype.battleAtt = function (attRoleVo, defRoleVo) {
        var _this = this;
        var tempAry = this.heroRoles.concat(this.enemyRoles);
        tempAry.forEach(function (roleView) {
            if (roleView) {
                if (roleView.roleVo.id == attRoleVo.id) {
                    _this.attRole = roleView;
                }
                else if (roleView.roleVo.id == defRoleVo.id) {
                    _this.defRole = roleView;
                }
            }
        });
        if (this.attRole && this.defRole) {
            //远攻
            if (this.attRole.roleVo.attFar == 1) {
                this.playAttackAni();
            }
            else { //近攻
                this.attRole.aniPlay(RoleAniIndex.MOVE);
                var tempX = defRoleVo.isEnemy ? 200 : -200;
                Laya.Tween.to(this.attRole, { x: defRoleVo.posPoint.x - tempX, y: defRoleVo.posPoint.y }, GameConfig.BATTLE_ATT_TIME * 1000, null, new Handler(this, this.playAttackAni, [attRoleVo, defRoleVo], true), 0, true);
            }
        }
    };
    /**
     * 移动到敌方攻击
     * @param data
     */
    RoleManager.prototype.playAttackAni = function () {
        var attRoleVo = this.attRole.roleVo;
        var defRoleVo = this.defRole.roleVo;
        var skillID = attRoleVo.getCanUserSkill();
        if (skillID > 0) {
            //技能释放
            this.attRole.aniPlay(RoleAniIndex.ATTACK, false, 500, this, this.moveBackLineup);
            var skill = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.SKILL);
            skill.playSkill(skillID, defRoleVo.posPoint);
        }
        else {
            //远攻，近攻击
            if (attRoleVo.attFar == 1) {
                this.attRole.aniPlay(RoleAniIndex.ATTACK, false, 500, this, this.moveBackLineupComplete);
            }
            else {
                this.attRole.aniPlay(RoleAniIndex.ATTACK, false, 500, this, this.moveBackLineup);
            }
        }
        BattleDataManager.ins.calculationAttribute();
        if (defRoleVo.isDeath) {
            this.defRole.aniPlay(RoleAniIndex.DEATH, false);
            this.defRole.setVisible(false);
        }
        else {
            this.defRole.aniPlay(RoleAniIndex.INJURED);
            this.defRole.showFloatFont(attRoleVo.att);
        }
        this.defRole.setBlood(1 - defRoleVo.battleHP / defRoleVo.hp);
    };
    /**
     * 攻击完移动回阵型
     */
    RoleManager.prototype.moveBackLineup = function () {
        var attRoleVo = this.attRole.roleVo;
        Laya.Tween.to(this.attRole, { x: attRoleVo.posPoint.x, y: attRoleVo.posPoint.y }, GameConfig.BATTLE_ATT_TIME * 1000 / 2, null, new Handler(this, this.moveBackLineupComplete, null, true), 0, true);
    };
    /**
     * 移动回阵型完成
     */
    RoleManager.prototype.moveBackLineupComplete = function () {
        DebugViewUtil.log("攻击返回", this.attRole.roleVo.name);
        this.attRole.aniPlay(RoleAniIndex.STAND);
        if (!this.defRole.roleVo.isDeath) {
            this.defRole.aniPlay(RoleAniIndex.STAND);
        }
        EventManager.ins.dispatchEvent(EventManager.ENEMY_ATT_COMPLETE);
    };
    /**清除舞台显示对象 */
    RoleManager.prototype.clearRole = function () {
        if (this.heroRoles) {
            var lastHeros = [];
            this.heroRoles.forEach(function (role) {
                Laya.Tween.clearAll(role);
                //只移除死掉英雄
                if (role.roleVo.isDeath) {
                    ObjectPoolUtil.stillObject(ObjectPoolUtil.HERO_ROLE, role);
                    role.dispose();
                }
                else {
                    lastHeros.push(role);
                }
                role.roleVo.isDeath = false;
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