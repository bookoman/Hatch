/*
* 循环假战斗引擎
*/
var LoopBattleEngine = /** @class */ (function () {
    function LoopBattleEngine() {
        this.timeCount = 0;
        this.battleTimeInterval = 0;
        this.battleTurnVoSum = 0;
        this.heroRoles = null;
        this.enemyRoles = null;
        this.loopBattleData = null;
        this.init();
    }
    LoopBattleEngine.prototype.init = function () {
        this.roleMgr = RoleManager.ins;
        this.timeCount = 0;
        this.battleTimeInterval = GameConfig.BATTLE_INTERVAL_TIME;
        this.loopBattleData = new LoopBattleData();
    };
    LoopBattleEngine.prototype.runUpdate = function () {
        // console.log("................"+this.timeCount);
        //场景战斗开关
        this.timeCount++;
        if (this.timeCount == this.battleTimeInterval) {
            this.enemyRuntoBallte();
        }
        this.loopBattleData.runRoleSkillCD();
    };
    /**
     * 敌人跑去战斗
     */
    LoopBattleEngine.prototype.enemyRuntoBallte = function () {
        MapManager.ins.enemyMoveSwitch = true;
        GameDataManager.ins.produceEnemyData();
        this.roleMgr.produceEnemy();
        this.loopBattleData.initData();
        EventManager.ins.addEvent(EventManager.ENEMY_RUNTO_COMPLETE, this, this.onEnemyRunComplete);
    };
    LoopBattleEngine.prototype.onEnemyRunComplete = function () {
        EventManager.ins.removeEvent(EventManager.ENEMY_RUNTO_COMPLETE, this.onEnemyRunComplete);
        MapManager.ins.enemyMoveSwitch = false;
        this.startBattle();
    };
    /**得到参战英雄 */
    LoopBattleEngine.prototype.getJoinBattleHeroVo = function () {
        var tempAry = new Array();
        this.roleMgr.heroRoles.forEach(function (hero) {
            tempAry.push(hero);
        });
        tempAry.sort(function (vo1, vo2) {
            return vo1.roleVo.gridX > vo2.roleVo.gridX ? -1 : 1;
        });
        tempAry = tempAry.slice(0, GameConfig.BATTLE_LOOP_HERO_SUM);
        return tempAry;
    };
    /**开始战斗 */
    LoopBattleEngine.prototype.startBattle = function () {
        this.heroRoles = this.getJoinBattleHeroVo();
        this.enemyRoles = this.roleMgr.enemyRoles;
        MapManager.ins.mapScrollSwitch = false;
        this.roleMgr.heroStand();
        this.attack();
    };
    LoopBattleEngine.prototype.attack = function () {
        var _this = this;
        this.loopBattleData.startAtt();
        this.battleTurnVoSum = this.loopBattleData.curBattleTurnVos.length;
        this.loopBattleData.curBattleTurnVos.forEach(function (battleTurnVo) {
            //根据攻击速度攻击延迟
            Laya.timer.once(100 * battleTurnVo.attRoleVo.atts / GameConfig.BATTLE_ADDSPEED_TIMES, _this, _this.battleAtt, [battleTurnVo.attRoleVo, battleTurnVo.defRoleVo], false);
        });
        // console.log("战斗，防御："+this.battleDataMgr.curAttRoleVo,this.battleDataMgr.curDefRoleVo);
    };
    /**结束战斗 */
    LoopBattleEngine.prototype.endBattle = function () {
        Laya.timer.clearAll(this);
        this.heroRoles = null;
        this.enemyRoles = null;
        this.timeCount = 0;
        MapManager.ins.mapScrollSwitch = true;
        this.loopBattleData.isEnd = false;
        this.roleMgr.clearRole();
        this.roleMgr.initHeros();
    };
    /**
     * 战斗
     * @param attRoleVo
     * @param defRoleVo
     */
    LoopBattleEngine.prototype.battleAtt = function (attRoleVo, defRoleVo) {
        if (!attRoleVo || !defRoleVo) {
            return;
        }
        var attRole;
        var defRole;
        var tempAry = this.heroRoles.concat(this.enemyRoles);
        tempAry.forEach(function (roleView) {
            if (roleView) {
                if (roleView.roleVo.id == attRoleVo.id) {
                    attRole = roleView;
                }
                else if (roleView.roleVo.id == defRoleVo.id) {
                    defRole = roleView;
                }
            }
        });
        if (attRole && defRole) {
            // //远攻
            // if(this.attRole.roleVo.attFar == 1)
            // {
            //     this.playAttackAni();
            // }
            // else
            // {//近攻
            //     this.attRole.aniPlay(RoleAniIndex.MOVE);
            //     var tempX:number = defRoleVo.isEnemy ? 200 : -200;
            //     Laya.Tween.to(this.attRole,{x:defRoleVo.posPoint.x - tempX,y:defRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000,null,new Handler(this,this.playAttackAni,[attRoleVo,defRoleVo],true),0,true);
            // }
            this.playAttackAni(attRole, defRole);
        }
    };
    /**
     * 移动到敌方攻击
     * @param data
     */
    LoopBattleEngine.prototype.playAttackAni = function (attRole, defRole) {
        var attRoleVo = attRole.roleVo;
        var defRoleVo = defRole.roleVo;
        var skillID = attRoleVo.getCanUserSkill();
        if (skillID > 0) {
            //技能释放
            attRole.aniPlay(RoleAniIndex.ATTACK, true, this, this.moveBackLineupComplete, defRole);
            var skill = ObjectPoolUtil.borrowObjcet(ObjectPoolUtil.SKILL);
            skill.playSkill(skillID, defRoleVo.posPoint);
        }
        else {
            //远攻，近攻击
            // if(attRoleVo.attFar == 1)
            // {
            //     this.attRole.aniPlay(RoleAniIndex.ATTACK,false,500,this,this.moveBackLineupComplete);
            // }
            // else
            // {
            //     this.attRole.aniPlay(RoleAniIndex.ATTACK,false,500,this,this.moveBackLineup);
            // }
            attRole.aniPlay(RoleAniIndex.ATTACK, true, this, this.moveBackLineupComplete, defRole);
        }
        this.loopBattleData.calculationAttribute(attRoleVo, defRoleVo);
        if (defRoleVo.isDeath) {
            defRole.aniPlay(RoleAniIndex.DEATH, false);
            defRole.setVisible(false);
        }
        else {
            defRole.aniPlay(RoleAniIndex.INJURED, false);
            defRole.showFloatFont(attRoleVo.att);
        }
        defRole.setBlood(1 - defRoleVo.battleDieAttTimes / defRoleVo.dieAttTimes);
    };
    // /**
    //  * 攻击完移动回阵型
    //  */
    // private moveBackLineup():void
    // {
    //     var attRoleVo:RoleVo = this.attRole.roleVo;
    //     Laya.Tween.to(this.attRole,{x:attRoleVo.posPoint.x,y:attRoleVo.posPoint.y},GameConfig.BATTLE_ATT_TIME*1000/2,null,new Handler(this,this.moveBackLineupComplete));
    // }
    /**
     * 移动回阵型完成
     */
    LoopBattleEngine.prototype.moveBackLineupComplete = function (roleAry) {
        var attRole = roleAry[0];
        var defRole = roleAry[1];
        // console.log("攻击返回",this.attRole.roleVo.name);
        attRole.aniPlay(RoleAniIndex.STAND);
        if (!attRole.roleVo.isDeath) {
            defRole.aniPlay(RoleAniIndex.STAND);
        }
        this.battleTurnVoSum--;
        if (this.battleTurnVoSum <= 0) {
            this.attCompleted();
        }
    };
    LoopBattleEngine.prototype.attCompleted = function () {
        if (this.loopBattleData.isEnd) {
            this.endBattle();
        }
        else {
            this.attack();
        }
    };
    return LoopBattleEngine;
}());
//# sourceMappingURL=LoopBattleEngine.js.map