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
        // this.bossBattleData.runRoleSkillCD();
    };
    /**得到参战英雄 */
    BossBattleEngine.prototype.getJoinBattleHeroVo = function (herosAry) {
        var tempAry = new Array();
        herosAry.forEach(function (hero) {
            tempAry.push(hero);
        });
        tempAry.sort(function (vo1, vo2) {
            return vo1.baseRoleVo.gridX > vo2.baseRoleVo.gridX ? -1 : 1;
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
    /**
     * 技能目标大于1个远功，技能效果加血，远攻
     *
     */
    BossBattleEngine.prototype.attack = function () {
        var _this = this;
        this.bossBattleData.startAtt();
        if (this.bossBattleData.curAttRoleVo == null) {
            this.attCompleted();
            return;
        }
        //寻找攻击，防御显示对象BaseRole
        var tempAry = this.heroRoles.concat(this.enemyRoles);
        this.defRoles = [];
        tempAry.forEach(function (roleView) {
            if (roleView) {
                if (roleView.baseRoleVo.roleId == _this.bossBattleData.curAttRoleVo.roleId) {
                    _this.attRole = roleView;
                }
                _this.bossBattleData.curDefRoleVos.forEach(function (defRoleVo) {
                    if (roleView.baseRoleVo.roleId == defRoleVo.roleId) {
                        _this.defRoles.push(roleView);
                    }
                });
            }
        });
        this.atkPreAbnormalStatus();
        // console.log("战斗，防御："+this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
    };
    /**攻击前异常buff检测 */
    BossBattleEngine.prototype.atkPreAbnormalStatus = function () {
        var isNoBuff = true;
        var baseRoleVo = this.attRole.baseRoleVo;
        baseRoleVo.calculationContinueEffect();
        //流血
        if (baseRoleVo.bossBattleRoleData.bleeding > 0) {
            isNoBuff = false;
            this.attRole.aniPlay(RoleAniIndex.INJURED, true, this, this.battleAtt);
            this.attRole.showFloatFont("流血-" + baseRoleVo.bossBattleRoleData.bleeding);
            this.attRole.setBlood(1 - baseRoleVo.battleHP / baseRoleVo.hp);
        }
        if (baseRoleVo.bossBattleRoleData.recoveryBlood > 0) {
            this.attRole.showFloatFont("血量+" + baseRoleVo.bossBattleRoleData.recoveryBlood);
        }
        if (baseRoleVo.bossBattleRoleData.addAtk > 0) {
            // console.log("加攻击局数...."+baseRoleVo.mainSkillContinuedVo.addAtk,baseRoleVo.assiSkillContinuedVo.addAtk,baseRoleVo.bossBattleRoleData.addAtk);
            this.attRole.showFloatFont("攻击力+" + baseRoleVo.bossBattleRoleData.addAtk);
        }
        if (baseRoleVo.isDeath) {
            this.attRole.aniPlay(RoleAniIndex.DEATH, false);
            this.attRole.setVisible(false);
            this.attack();
            return;
        }
        if (isNoBuff) {
            this.battleAtt();
        }
    };
    /**
     * 一对一战斗
     * @param attRoleVo
     * @param defRoleVo
     */
    // public battleAtt(attRoleVo:BaseRoleVo,defRoleVos:Array<BaseRoleVo>):void
    BossBattleEngine.prototype.battleAtt = function () {
        var _this = this;
        if (this.attRole && this.defRoles) {
            //远攻
            var isFar = false;
            var skillVo = this.attRole.baseRoleVo.curSkillVo;
            if (skillVo) {
                isFar = (this.defRoles.length > 1 || skillVo.skillMainEffect == SkillEffect.RECOVERY_BLOOD || skillVo.skillMainEffect == SkillEffect.ANGER);
            }
            if (isFar) {
                this.defRoles.forEach(function (baseRole) {
                    _this.playAttackAni(baseRole);
                });
                // SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
            }
            else { //近攻               
                var defRole = this.defRoles[0];
                var defRoleVo = defRole.baseRoleVo;
                this.attRole.aniPlay(RoleAniIndex.MOVE);
                var tempX = defRoleVo.isEnemy ? 200 : -200;
                Laya.Tween.to(this.attRole, { x: defRoleVo.posPoint.x - tempX, y: defRoleVo.posPoint.y }, GameConfig.BATTLE_ATT_TIME * 1000 / GameConfig.BATTLE_ADDSPEED_TIMES, null, new Handler(this, this.playAttackAni, [defRole], true), 0, true);
                // SoundsManager.ins.playSound("res/outside/sound/effect/fit.wav");
            }
        }
    };
    /**
     * 移动到敌方攻击
     * @param data
     */
    BossBattleEngine.prototype.playAttackAni = function (defRole) {
        var attRoleVo = this.attRole.baseRoleVo;
        var defRoleVo = defRole.baseRoleVo;
        var skillVo = attRoleVo.curSkillVo;
        if (skillVo) {
            //技能释放
            this.attRole.aniPlay(RoleAniIndex.ATTACK, true, this, this.moveBackLineup, defRole);
            var skill = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.SKILL);
            skill.playSkill(skillVo.modelId, defRole);
            TipsManager.ins.showFloatMsg(skillVo.name, 30, "#00ff00", this.attRole, 0, 0, 1, 0, 200);
        }
        else {
            //远攻，近攻击
            if (attRoleVo.attFar == 1) {
                this.attRole.aniPlay(RoleAniIndex.ATTACK, true, this, this.moveBackLineupComplete, defRole);
            }
            else {
                this.attRole.aniPlay(RoleAniIndex.ATTACK, true, this, this.moveBackLineup, defRole);
            }
        }
        // var hurt:number = this.bossBattleData.calculationAttribute();
        defRoleVo.calculationAttribute(attRoleVo, this.bossBattleData.getRankAtk(attRoleVo.isEnemy));
        //延迟飘血
        Laya.timer.once(500 / GameConfig.BATTLE_ADDSPEED_TIMES, this, function () {
            //本次伤害
            var bossBattleRoleData = defRoleVo.bossBattleRoleData;
            if (bossBattleRoleData.hurt > 0) {
                defRole.showFloatFont("-" + bossBattleRoleData.hurt);
                defRole.setBlood(1 - defRoleVo.battleHP / defRoleVo.hp);
            }
            //+攻击力
            if (bossBattleRoleData.addAtk > 0 && defRoleVo.isShowOnceSkill(defRoleVo.mainSkillContinuedVo.addAtk, defRoleVo.assiSkillContinuedVo.addAtk, attRoleVo)) {
                defRole.baseRoleVo.realAtk += bossBattleRoleData.addAtk;
                defRole.showFloatFont("攻击力+" + bossBattleRoleData.addAtk);
            }
            if (bossBattleRoleData.recoveryBlood > 0 && defRoleVo.isShowOnceSkill(defRoleVo.mainSkillContinuedVo.recoveryBlood, defRoleVo.assiSkillContinuedVo.recoveryBlood, attRoleVo)) {
                defRole.baseRoleVo.battleHP += bossBattleRoleData.recoveryBlood;
                //战斗血量
                if (defRole.baseRoleVo.battleHP > defRole.baseRoleVo.hp)
                    defRole.baseRoleVo.battleHP = defRole.baseRoleVo.hp;
                defRole.setBlood(1 - defRoleVo.battleHP / defRoleVo.hp);
                defRole.showFloatFont("血量+" + bossBattleRoleData.recoveryBlood);
            }
            if (bossBattleRoleData.bleeding > 0 && defRoleVo.isShowOnceSkill(defRoleVo.mainSkillContinuedVo.bleeding, defRoleVo.assiSkillContinuedVo.bleeding, attRoleVo)) {
                defRole.baseRoleVo.battleHP -= bossBattleRoleData.bleeding;
                defRole.setBlood(1 - defRoleVo.battleHP / defRoleVo.hp);
                defRole.showFloatFont("流血-" + bossBattleRoleData.bleeding);
            }
        }, null, false);
        // if(defRoleVo.name == "美颌龙")
        // {
        //     console.log(".........",defRoleVo.battleHP,bossBattleRoleData.bleeding);
        // }
        if (defRoleVo.isDeath) {
            defRole.aniPlay(RoleAniIndex.DEATH, false);
            defRole.setVisible(false);
        }
        else {
            if (defRole.baseRoleVo.isEnemy != this.attRole.baseRoleVo.isEnemy)
                defRole.aniPlay(RoleAniIndex.INJURED, false);
        }
    };
    /**
     * 攻击完移动回阵型
     */
    BossBattleEngine.prototype.moveBackLineup = function (defRole) {
        var attRoleVo = this.attRole.baseRoleVo;
        Laya.Tween.to(this.attRole, { x: attRoleVo.posPoint.x, y: attRoleVo.posPoint.y }, GameConfig.BATTLE_ATT_TIME * 1000 / 2 / GameConfig.BATTLE_ADDSPEED_TIMES, null, new Handler(this, this.moveBackLineupComplete, [defRole], true), 0, true);
    };
    /**
     * 移动回阵型完成
     */
    BossBattleEngine.prototype.moveBackLineupComplete = function (roles) {
        var atkRole = roles[0];
        var defRole = roles[1];
        // DebugViewUtil.log("攻击返回",this.attRole.baseRoleVo.name);
        this.attRole.aniPlay(RoleAniIndex.STAND);
        if (!defRole.baseRoleVo.isDeath) {
            defRole.aniPlay(RoleAniIndex.STAND);
        }
        this.attCompleted();
    };
    BossBattleEngine.prototype.attCompleted = function () {
        this.bossBattleData.checkBattleEnd();
        if (this.bossBattleData.isEnd) {
            // Laya.timer.once(1000,this,this.endBattle);
            this.showBattleResultView(this.bossBattleData.isWin);
        }
        else {
            this.attack();
            // console.log("..."+this.bossBattleData.turnCount);
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
    BossBattleEngine.prototype.showBattleResultView = function (isSuccess) {
        var resAry;
        var baseMediator;
        if (isSuccess) {
            resAry = [
                { url: "unpack/battlesuccess/img_bg.png", type: Loader.IMAGE },
                { url: "unpack/battlesuccess/img_blue.png", type: Loader.IMAGE },
                { url: "unpack/battlesuccess/img_bluebg.png", type: Loader.IMAGE },
                { url: "unpack/battlesuccess/img_success.png", type: Loader.IMAGE },
                { url: "res/atlas/battlesuccess.atlas", type: Loader.ATLAS }
            ];
            baseMediator = new BattleSuccessMediator(resAry);
        }
        else {
            resAry = [
                { url: "unpack/battlefail/img_bg.png", type: Loader.IMAGE },
                { url: "unpack/battlefail/img_fail.png", type: Loader.IMAGE },
                { url: "unpack/battlefail/img_graybg.png", type: Loader.IMAGE },
                { url: "unpack/battlefail/img_grayfillter.png", type: Loader.IMAGE },
                { url: "res/atlas/battlefail.atlas", type: Loader.ATLAS }
            ];
            baseMediator = new BattleFailMediator(resAry);
        }
    };
    return BossBattleEngine;
}());
//# sourceMappingURL=BossBattleEngine.js.map