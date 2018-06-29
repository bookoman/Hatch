/*
* name;
*/
var BossBattleData = /** @class */ (function () {
    function BossBattleData() {
        this.curAttCamp = 0;
        this.turnCount = 0;
    }
    BossBattleData.prototype.initData = function () {
        this.turnCount = 0;
        this.attHeroVos = this.getJoinBattleHeroVo();
        this.attEnemyVos = GameDataManager.ins.bossData.masterVos;
        this.attHeroVos.forEach(function (roleVo) {
            roleVo.battleHP = roleVo.hp;
            roleVo.initBattleData();
            roleVo.resetSkillCD();
            roleVo.isDeath = false;
            roleVo.isAtted = false;
            roleVo.attEnemyVos = [];
        });
        this.attEnemyVos.forEach(function (roleVo) {
            roleVo.battleHP = roleVo.hp;
            roleVo.initBattleData();
            roleVo.resetSkillCD();
            roleVo.isDeath = false;
            roleVo.isAtted = false;
            roleVo.attEnemyVos = [];
        });
        this.seekAttTarget2(this.attHeroVos, this.attEnemyVos);
        this.seekAttTarget2(this.attEnemyVos, this.attHeroVos);
        this.curAttCamp = BattleAttCampType.HERO;
    };
    /**得到参战英雄RoleVo */
    BossBattleData.prototype.getJoinBattleHeroVo = function () {
        var tempAry = new Array();
        GameDataManager.ins.selfPlayerData.upHeroVos.forEach(function (baseRoleVo) {
            tempAry.push(baseRoleVo);
        });
        tempAry.sort(function (vo1, vo2) {
            return vo1.gridX > vo2.gridX ? -1 : 1;
        });
        tempAry = tempAry.slice(0, GameConfig.BATTLE_BOSS_HERO_SUM);
        return tempAry;
    };
    /**
     * 开始战斗
     */
    BossBattleData.prototype.startAtt = function () {
        var turnAttckSum = GameConfig.BATTLE_TURN_ATTACK_SUM;
        if (this.curAttCamp == 0) {
        }
        else if (this.curAttCamp == BattleAttCampType.HERO) {
            this.curAttRoleVo = this.getAttRoleVo(this.attHeroVos);
        }
        else if (this.curAttCamp == BattleAttCampType.ENEMY) {
            this.curAttRoleVo = this.getAttRoleVo(this.attEnemyVos);
        }
        if (this.curAttRoleVo == null) {
            return;
        }
        this.curDefRoleVos = [];
        /**得到技能 */
        var skillVo = this.curAttRoleVo.getCanUserSkill();
        if (skillVo && skillVo.isCanUse) {
            skillVo.resetCD();
            //技能攻击对象
            this.seekSkillAtkTarget(skillVo);
        }
        else {
            //嘲讽
            var tempVo = this.enemySkillSeekTarget(this.curAttRoleVo.attEnemyVos);
            if (tempVo) {
                this.curDefRoleVos.push(tempVo);
                return;
            }
            //寻找攻击具体对象
            for (var i = 0; i < this.curAttRoleVo.attEnemyVos.length; i++) {
                tempVo = this.curAttRoleVo.attEnemyVos[i];
                if (!tempVo.isDeath) {
                    this.curDefRoleVos.push(tempVo);
                    break;
                }
            }
        }
    };
    /**计算属性 */
    // public calculationAttribute():number
    // {
    //     var readHurt:number = 0;
    //     var curRoleVo:BaseRoleVo;
    //     for(var i = 0;i < this.curDefRoleVos.length;i++)
    //     {
    //         curRoleVo = this.curDefRoleVos[i];
    //         curRoleVo.calculationAttribute(this.curAttRoleVo);
    //         //自身加成
    //         if(this.curAttCamp == BattleAttCampType.HERO && !curRoleVo.isEnemy || this.curAttCamp == BattleAttCampType.ENEMY && curRoleVo.isEnemy)
    //         {
    //         }
    //         else
    //         {
    //             readHurt = FormulaUtil.realDamageValue(this.curAttRoleVo,curRoleVo);
    //             curRoleVo.battleHP -= readHurt;
    //             curRoleVo.isDeath = curRoleVo.battleHP <= 0;
    //         }
    //     }
    //     this.curAttRoleVo.isAtted = true;
    //     this.checkBattleEnd();
    //     if(this.curAttCamp == BattleAttCampType.ENEMY)
    //     {
    //         //DebugViewUtil.log("战斗日记：","....."+ this.curAttRoleVo.name + "("+ this.curAttRoleVo.id+")"+"对"+ this.curDefRoleVos.name + "("+ this.curDefRoleVos.id+")发动了攻击，后者受到伤害:"+this.curAttRoleVo.att + ",剩下血量:"+this.curDefRoleVos.battleHP);
    //         // console.log("....."+ this.curAttRoleVo.name + "("+ this.curAttRoleVo.id+")"+"对"+ this.curDefRoleVos.name + "("+ this.curDefRoleVos.id+")发动了攻击，后者受到伤害:"+this.curAttRoleVo.att + ",剩下血量:"+this.curDefRoleVos.battleHP);
    //     }
    //     return readHurt;
    // }
    /**
     * 检测战斗结束
     */
    BossBattleData.prototype.checkBattleEnd = function () {
        var _this = this;
        if (this.curAttRoleVo)
            this.curAttRoleVo.isAtted = true;
        //检测战斗结束，玩家英雄阵营没有活的对象战斗失败，反之战斗胜利
        //英雄检测
        this.isEnd = true;
        var isChangeAttStatus = true;
        var liveRoleCount = 0;
        this.attHeroVos.forEach(function (roleVo) {
            if (!roleVo.isDeath) {
                liveRoleCount++;
                _this.isEnd = false;
                if (!roleVo.isAtted) {
                    isChangeAttStatus = false;
                }
            }
            // else
            // console.log("我方：" ,roleVo.name,roleVo.battleHP);
        });
        if (this.isEnd) {
            this.isWin = false;
            console.log("战斗结束" + this.isWin);
            return;
        }
        if (isChangeAttStatus) {
            this.attHeroVos.forEach(function (roleVo) {
                roleVo.isAtted = false;
            });
        }
        //敌人检测
        isChangeAttStatus = true;
        this.isEnd = true;
        this.attEnemyVos.forEach(function (roleVo) {
            if (!roleVo.isDeath) {
                liveRoleCount++;
                _this.isEnd = false;
                if (!roleVo.isAtted) {
                    isChangeAttStatus = false;
                }
            }
            // else
            // console.log("敌方：" ,roleVo.name,roleVo.battleHP);
        });
        if (this.isEnd) {
            this.isWin = true;
            console.log("战斗结束" + this.isWin);
            return;
        }
        if (isChangeAttStatus) {
            this.attEnemyVos.forEach(function (roleVo) {
                roleVo.isAtted = false;
            });
        }
        this.turnCount++;
        //轮数跑技能CD
        if (this.turnCount > liveRoleCount) {
            this.turnCount = 0;
            this.runRoleSkillCD();
            console.log(this.turnCount, liveRoleCount);
        }
        //改变阵营
        if (this.curAttCamp == BattleAttCampType.HERO) {
            this.curAttCamp = BattleAttCampType.ENEMY;
        }
        else if (this.curAttCamp == BattleAttCampType.ENEMY) {
            this.curAttCamp = BattleAttCampType.HERO;
        }
    };
    /**
     * 得到当前攻击角色
     * @param roleVos
     */
    BossBattleData.prototype.getAttRoleVo = function (baseRoleVos) {
        var baseRoleVo;
        for (var i = 0; i < baseRoleVos.length; i++) {
            baseRoleVo = baseRoleVos[i];
            if (!baseRoleVo.isDeath && !baseRoleVo.isAtted) {
                return baseRoleVo;
            }
        }
        return null;
    };
    /**
     * 寻找攻击目标
     * 普通攻击:
     *  1,找同gy，再又上至下找gy
     * 技能攻击:
     *  1,一个目标：找同gy，再又上至下找gy
     *  2,攻击一行gx,攻击一列gy
     * @param attAry
     * @param defAry
     */
    BossBattleData.prototype.seekAttTarget = function (attAry, defAry) {
        var attRoleVo;
        var defRoleVo;
        for (var i = 0; i < attAry.length; i++) {
            attRoleVo = attAry[i];
            for (var j = 0; j < defAry.length; j++) {
                defRoleVo = defAry[j];
                var attInd = Math.abs(attRoleVo.gridY - defRoleVo.gridY);
                if (attInd < defAry.length) {
                    attRoleVo.attEnemyVos[attInd] = defRoleVo;
                }
                else {
                    attRoleVo.attEnemyVos.push(defRoleVo);
                }
            }
        }
    };
    /**
     * 寻找攻击目标2
     * 先攻击前排，前排击败后再攻击后排
     * @param attAry
     * @param defAry
     */
    BossBattleData.prototype.seekAttTarget2 = function (attAry, defAry) {
        var attRoleVo;
        for (var i = 0; i < attAry.length; i++) {
            attRoleVo = attAry[i];
            for (var j = 0; j < defAry.length; j++) {
                attRoleVo.attEnemyVos.push(defAry[j]);
            }
            if (attRoleVo.isEnemy) {
                attRoleVo.attEnemyVos.sort(function (a, b) {
                    return a.gridY % 2 == 0 ? 1 : -1;
                });
            }
            else {
                attRoleVo.attEnemyVos.sort(function (a, b) {
                    return a.gridX > b.gridX ? 1 : -1;
                });
            }
        }
    };
    /*******************技能相关 */
    /**
     * 跑角色技能cd
     */
    BossBattleData.prototype.runRoleSkillCD = function () {
        if (this.attHeroVos) {
            this.attHeroVos.forEach(function (baseRoleVo) {
                baseRoleVo.runCD();
                baseRoleVo.runSkillEffectCD();
            });
        }
        if (this.attEnemyVos) {
            this.attEnemyVos.forEach(function (baseRoleVo) {
                baseRoleVo.runCD();
                baseRoleVo.runSkillEffectCD();
            });
        }
    };
    /**技能攻击目标 */
    BossBattleData.prototype.seekSkillAtkTarget = function (skillVo) {
        var i;
        var attVos = this.curAttRoleVo.isEnemy ? this.attEnemyVos : this.attHeroVos;
        var defVos = this.curAttRoleVo.isEnemy ? this.attHeroVos : this.attEnemyVos;
        var tempVo;
        var tempAry = [];
        var skillTargetType = Number(skillVo.skillConfig.skillTargetType);
        switch (skillTargetType) {
            case SkillTarget.SELF:
                this.curAttRoleVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(this.curAttRoleVo);
                break;
            case SkillTarget.WE_ONE:
                for (i = 0; i < attVos.length; i++) {
                    tempVo = attVos[i];
                    if (tempVo.roleId != this.curAttRoleVo.roleId && !tempVo.isDeath) {
                        tempAry.push(tempVo);
                    }
                }
                var ind = Math.ceil(Math.random() * tempAry.length) - 1;
                tempVo = tempAry[ind];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
            case SkillTarget.WE_ALL:
                this.curDefRoleVos = attVos;
                this.curDefRoleVos.forEach(function (baseRoleVo) {
                    baseRoleVo.addSkillEffectCDs(skillVo);
                });
                break;
            case SkillTarget.ENEMY_ONE:
                for (i = 0; i < defVos.length; i++) {
                    tempVo = defVos[i];
                    if (!tempVo.isDeath) {
                        tempAry.push(tempVo);
                    }
                }
                //嘲讽
                var tempVo = this.enemySkillSeekTarget(tempAry);
                if (tempVo) {
                    this.curDefRoleVos.push(tempVo);
                    return;
                }
                var ind = Math.ceil(Math.random() * tempAry.length) - 1;
                tempVo = tempAry[ind];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
            case SkillTarget.ENEMY_ALL:
                this.curDefRoleVos = defVos;
                this.curDefRoleVos.forEach(function (baseRoleVo) {
                    baseRoleVo.addSkillEffectCDs(skillVo);
                });
                break;
            case SkillTarget.WE_ONE_SELF:
                for (i = 0; i < attVos.length; i++) {
                    tempVo = attVos[i];
                    if (!tempVo.isDeath) {
                        tempAry.push(tempVo);
                    }
                }
                var ind = Math.ceil(Math.random() * tempAry.length) - 1;
                tempVo = tempAry[ind];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
            case SkillTarget.WE_LEAST_PERCENT_BLOOD:
                for (i = 0; i < attVos.length; i++) {
                    tempVo = attVos[i];
                    if (!tempVo.isDeath) {
                        tempAry.push(tempVo);
                    }
                }
                tempAry.sort(function (vo1, vo2) {
                    var per1 = vo1.battleHP / vo1.hp;
                    var per2 = vo2.battleHP / vo2.hp;
                    return per1 < per2 ? 1 : -1;
                });
                tempVo = tempAry[0];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
            case SkillTarget.ENEMY_LEAST_PERCENT_BLOOD:
                for (i = 0; i < defVos.length; i++) {
                    tempVo = defVos[i];
                    if (!tempVo.isDeath) {
                        tempAry.push(tempVo);
                    }
                }
                tempAry.sort(function (vo1, vo2) {
                    var per1 = vo1.battleHP / vo1.hp;
                    var per2 = vo2.battleHP / vo2.hp;
                    return per1 < per2 ? 1 : -1;
                });
                tempVo = tempAry[0];
                tempVo.addSkillEffectCDs(skillVo);
                this.curDefRoleVos.push(tempVo);
                break;
        }
    };
    /**
     * 敌方技能选取优先攻击
     * @param baseRoleVos
     */
    BossBattleData.prototype.enemySkillSeekTarget = function (baseRoleVos) {
        var tempVo;
        var curSkillVo;
        for (var i = 0; i < baseRoleVos.length; i++) {
            tempVo = baseRoleVos[i];
            if (!tempVo.isDeath) {
                if (tempVo.mainSkillContinuedVo.anger > 0 || tempVo.assiSkillContinuedVo.anger > 0) { //嘲讽技能
                    return tempVo;
                }
            }
        }
        return null;
    };
    /**得到队伍攻击力 */
    BossBattleData.prototype.getRankAtk = function (isEnemy) {
        var ary = isEnemy ? this.attEnemyVos : this.attHeroVos;
        var ranksAtk = 0;
        ary.forEach(function (roleVo) {
            if (!roleVo.isDeath) {
                ranksAtk += roleVo.realAtk;
            }
        });
        return ranksAtk;
    };
    /**动画加载准备完毕 */
    BossBattleData.curLoadNum = 0;
    BossBattleData.loadSum = 0;
    return BossBattleData;
}());
//# sourceMappingURL=BossBattleData.js.map