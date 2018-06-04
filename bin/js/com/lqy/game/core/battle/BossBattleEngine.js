/*
* name;
*/
var BossBattleEngine = /** @class */ (function () {
    function BossBattleEngine() {
        this.heroRoles = null;
        this.enemyRoles = null;
        this.bossBattleData = null;
    }
    BossBattleEngine.prototype.runUpdate = function () {
        this.bossBattleData.runRoleSkillCD();
    };
    /**得到参战英雄 */
    BossBattleEngine.prototype.getJoinBattleHeroVo = function (herosAry) {
        var tempAry = new Array();
        herosAry.forEach(function (hero) {
            tempAry.push(hero);
        });
        tempAry.sort(function (vo1, vo2) {
            return vo1.roleVo.gridX > vo2.roleVo.gridX ? -1 : 1;
        });
        tempAry = tempAry.slice(0, GameConfig.BATTLE_BOSS_HERO_SUM);
        return tempAry;
    };
    /**开始战斗 */
    BossBattleEngine.prototype.startBattle = function (herosAry, enemyAry) {
        this.bossBattleData = new BossBattleData();
        this.bossBattleData.initData();
        this.heroRoles = this.getJoinBattleHeroVo(herosAry);
        this.enemyRoles = enemyAry;
        //检测所有角色是否加载完毕
        this.roleAry = herosAry.concat(enemyAry);
        Laya.timer.loop(100, this, this.battleIsReady);
    };
    BossBattleEngine.prototype.battleIsReady = function () {
        var isRead = true;
        this.roleAry.forEach(function (baseRole) {
            if (!baseRole.isLoaded) {
                isRead = false;
            }
        });
        if (isRead) {
            Laya.timer.clear(this, this.battleIsReady);
            this.roleAry = null;
            this.attack();
        }
    };
    BossBattleEngine.prototype.attack = function () {
        this.bossBattleData.startAtt();
        this.battleAtt(this.bossBattleData.curAttRoleVo, this.bossBattleData.curDefRoleVo);
        // console.log("战斗，防御："+this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
    };
    BossBattleEngine.prototype.attCompleted = function () {
        // this.battleDataMgr.calculationAttribute();
        if (this.bossBattleData.isEnd) {
            this.endBattle();
        }
        else {
            this.attack();
        }
    };
    /**结束战斗 */
    BossBattleEngine.prototype.endBattle = function () {
        Laya.timer.clearAll(this);
        this.heroRoles = null;
        this.enemyRoles = null;
        this.bossBattleData.isEnd = false;
        GameDataManager.ins.isChallengeBoss = false;
        MapManager.ins.backLoopMap();
        EventManager.ins.dispatchEvent(EventManager.CHALLENGE_BOSS, [true]);
        //回到假战斗
        BattleEngine.ins.loopBattleRun();
    };
    /**
     * 战斗
     * @param attRoleVo
     * @param defRoleVo
     */
    BossBattleEngine.prototype.battleAtt = function (attRoleVo, defRoleVo) {
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
                SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
            }
            else { //近攻               
                this.attRole.aniPlay(RoleAniIndex.MOVE);
                var tempX = defRoleVo.isEnemy ? 200 : -200;
                Laya.Tween.to(this.attRole, { x: defRoleVo.posPoint.x - tempX, y: defRoleVo.posPoint.y }, GameConfig.BATTLE_ATT_TIME * 1000 / GameConfig.BATTLE_ADDSPEED_TIMES, null, new Handler(this, this.playAttackAni, [attRoleVo, defRoleVo], true), 0, true);
                SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
            }
        }
    };
    /**
     * 移动到敌方攻击
     * @param data
     */
    BossBattleEngine.prototype.playAttackAni = function () {
        var attRoleVo = this.attRole.roleVo;
        var defRoleVo = this.defRole.roleVo;
        var skillID = attRoleVo.getCanUserSkill();
        if (skillID > 0) {
            //技能释放
            this.attRole.aniPlay(RoleAniIndex.ATTACK, true, this, this.moveBackLineup);
            var skill = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.SKILL);
            skill.playSkill(skillID, this.defRole);
        }
        else {
            //远攻，近攻击
            if (attRoleVo.attFar == 1) {
                this.attRole.aniPlay(RoleAniIndex.ATTACK, true, this, this.moveBackLineupComplete);
            }
            else {
                this.attRole.aniPlay(RoleAniIndex.ATTACK, true, this, this.moveBackLineup);
            }
        }
        this.bossBattleData.calculationAttribute();
        if (defRoleVo.isDeath) {
            this.defRole.aniPlay(RoleAniIndex.DEATH, false);
            this.defRole.setVisible(false);
        }
        else {
            this.defRole.aniPlay(RoleAniIndex.INJURED, false);
            this.defRole.showFloatFont(attRoleVo.att);
        }
        this.defRole.setBlood(1 - defRoleVo.battleHP / defRoleVo.hp);
    };
    /**
     * 攻击完移动回阵型
     */
    BossBattleEngine.prototype.moveBackLineup = function () {
        var attRoleVo = this.attRole.roleVo;
        Laya.Tween.to(this.attRole, { x: attRoleVo.posPoint.x, y: attRoleVo.posPoint.y }, GameConfig.BATTLE_ATT_TIME * 1000 / 2 / GameConfig.BATTLE_ADDSPEED_TIMES, null, new Handler(this, this.moveBackLineupComplete, null, true), 0, true);
    };
    /**
     * 移动回阵型完成
     */
    BossBattleEngine.prototype.moveBackLineupComplete = function () {
        DebugViewUtil.log("攻击返回", this.attRole.roleVo.name);
        this.attRole.aniPlay(RoleAniIndex.STAND);
        if (!this.defRole.roleVo.isDeath) {
            this.defRole.aniPlay(RoleAniIndex.STAND);
        }
        this.attCompleted();
    };
    return BossBattleEngine;
}());
//# sourceMappingURL=BossBattleEngine.js.map