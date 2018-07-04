/*
* 循环假战斗数据
*/
var LoopBattleData = /** @class */ (function () {
    function LoopBattleData() {
        this.curAttCamp = 0;
    }
    LoopBattleData.prototype.initData = function () {
        this.attHeroVos = this.getJoinBattleHeroVo();
        this.attEnemyVos = GameDataManager.ins.enemyData.masterNPCVos;
        this.attHeroVos.forEach(function (heroVo) {
            heroVo.battleHP = heroVo.hp;
            heroVo.battleDieAttTimes = heroVo.dieAttTimes;
            heroVo.resetSkillCD();
            heroVo.isDeath = false;
            heroVo.isAtted = false;
            heroVo.attEnemyVos = [];
        });
        this.attEnemyVos.forEach(function (masterNpcVo) {
            masterNpcVo.battleHP = masterNpcVo.hp;
            masterNpcVo.battleDieAttTimes = masterNpcVo.dieAttTimes;
            masterNpcVo.resetSkillCD();
            masterNpcVo.isDeath = false;
            masterNpcVo.isAtted = false;
            masterNpcVo.attEnemyVos = [];
        });
        this.seekAttTarget(this.attHeroVos, this.attEnemyVos);
        this.seekAttTarget(this.attEnemyVos, this.attHeroVos);
        this.curAttCamp = BattleAttCampType.HERO;
    };
    /**得到参战英雄RoleVo */
    LoopBattleData.prototype.getJoinBattleHeroVo = function () {
        var tempAry = new Array();
        GameDataManager.ins.selfPlayerData.upHeroVos.forEach(function (heroVo) {
            tempAry.push(heroVo);
        });
        tempAry.sort(function (vo1, vo2) {
            return vo1.gridX > vo2.gridX ? -1 : 1;
        });
        tempAry = tempAry.slice(0, GameConfig.BATTLE_LOOP_HERO_SUM);
        return tempAry;
    };
    /**
     * 开始战斗
     */
    LoopBattleData.prototype.startAtt = function () {
        var turnAttckSum = GameConfig.BATTLE_TURN_ATTACK_SUM;
        if (this.curAttCamp == 0) {
        }
        else if (this.curAttCamp == BattleAttCampType.HERO) {
            this.curBattleTurnVos = this.getBattleTurnVos(this.attHeroVos, this.attEnemyVos);
        }
        else if (this.curAttCamp == BattleAttCampType.ENEMY) {
            this.curBattleTurnVos = this.getBattleTurnVos(this.attEnemyVos, this.attHeroVos);
        }
    };
    /**
    * 得到当前攻击角色
    * @param roleVos
    */
    LoopBattleData.prototype.getBattleTurnVos = function (attRoleVos, defRoleVos) {
        var ary = [];
        var battleTurnVo;
        var attRoleVo;
        for (var i = 0; i < attRoleVos.length; i++) {
            attRoleVo = attRoleVos[i];
            battleTurnVo = new BattleTurnVo();
            var defRoleVo;
            if (!attRoleVo.isDeath && !attRoleVo.isAtted) {
                //寻找攻击具体对象
                for (var j = 0; j < attRoleVo.attEnemyVos.length; j++) {
                    defRoleVo = attRoleVo.attEnemyVos[j];
                    if (defRoleVo && !defRoleVo.isDeath && attRoleVo.gridY == defRoleVo.gridY) {
                        break;
                    }
                    defRoleVo = null;
                }
            }
            if (attRoleVo && defRoleVo) {
                battleTurnVo.attRoleVo = attRoleVo;
                battleTurnVo.defRoleVo = defRoleVo;
                ary.push(battleTurnVo);
            }
        }
        return ary;
    };
    /**计算属性 */
    LoopBattleData.prototype.calculationAttribute = function (attRoleVo, defRoleVo) {
        //血量检测
        // this.curDefRoleVo.battleHP -= this.curAttRoleVo.att;
        // this.curDefRoleVo.isDeath = this.curDefRoleVo.battleHP <= 0;
        // this.curAttRoleVo.isAtted = true;
        // this.checkBattleEnd();
        //攻击次数检测
        this.curBattleTurnVos.forEach(function (battleTurnVo) {
            // console.log(attRoleVo.name + ","+attRoleVo.roleId,battleTurnVo.attRoleVo.name + ","+battleTurnVo.attRoleVo.roleId);
            if (attRoleVo.roleId == battleTurnVo.attRoleVo.roleId && defRoleVo.roleId == battleTurnVo.defRoleVo.roleId) {
                battleTurnVo.calculationAttribute();
            }
        });
        this.checkBattleEnd();
    };
    /**
     * 检测战斗结束
     */
    LoopBattleData.prototype.checkBattleEnd = function () {
        var _this = this;
        //检测战斗结束，玩家英雄阵营没有活的对象战斗失败，反之战斗胜利
        //英雄检测
        this.isEnd = true;
        var isChangeAttStatus = true;
        this.attHeroVos.forEach(function (roleVo) {
            if (!roleVo.isDeath) {
                _this.isEnd = false;
                if (!roleVo.isAtted) {
                    isChangeAttStatus = false;
                }
            }
        });
        if (this.isEnd) {
            this.isWin = false;
            // console.log("战斗结束"+this.isWin);
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
                _this.isEnd = false;
                if (!roleVo.isAtted) {
                    isChangeAttStatus = false;
                }
            }
        });
        if (this.isEnd) {
            this.isWin = true;
            this.productRewards();
            // console.log("战斗结束"+this.isWin);
            return;
        }
        if (isChangeAttStatus) {
            this.attEnemyVos.forEach(function (roleVo) {
                roleVo.isAtted = false;
            });
        }
        //改变阵营
        if (this.curAttCamp == BattleAttCampType.HERO) {
            this.curAttCamp = BattleAttCampType.ENEMY;
        }
        else if (this.curAttCamp == BattleAttCampType.ENEMY) {
            this.curAttCamp = BattleAttCampType.HERO;
        }
    };
    LoopBattleData.prototype.productRewards = function () {
        var gateConfig = ConfigManager.ins.getGateSampleConfig(GameDataManager.ins.hangGateKey);
        var rewards = gateConfig.getRandowRewards();
        BattleReportData.ins.addBattleReportVo(BattleReportDataType.REWARD, null, null, null, rewards);
    };
    /**
     * 寻找攻击目标
     * 普通攻击:
     *  1,找同gy，再向上向下找攻击对象
     * 技能攻击:
     *  1,一个目标：找同gy，再又上至下找gy
     *  2,攻击一行gx,攻击一列gy
     * @param attAry
     * @param defAry
     */
    LoopBattleData.prototype.seekAttTarget = function (attAry, defAry) {
        // var reduceAry:Array<BaseRoleVo> = [];
        // var plusAry:Array<BaseRoleVo> = [];
        var endAry;
        var attRoleVo;
        var defRoleVo;
        for (var i = 0; i < attAry.length; i++) {
            attRoleVo = attAry[i];
            endAry = [];
            endAry[0] = null;
            for (var j = 0; j < defAry.length; j++) {
                defRoleVo = defAry[j];
                var attInd = attRoleVo.gridY - defRoleVo.gridY;
                if (attInd == 0) {
                    endAry[0] = defRoleVo;
                }
                else {
                    endAry.push(defRoleVo);
                }
                // if(attInd < 0)
                // {
                //     reduceAry[Math.abs(attInd)] = defRoleVo;
                // }
                // else
                // {
                //     plusAry[attInd] = defRoleVo;   
                // }
            }
            // attRoleVo.attEnemyVos = plusAry.concat(reduceAry);
            attRoleVo.attEnemyVos = endAry;
        }
    };
    /**
     * 寻找攻击目标2----格子坐标规律
     * 先攻击前排，前排击败后再攻击后排
     * @param attAry
     * @param defAry
     */
    LoopBattleData.prototype.seekAttTarget2 = function (attAry, defAry) {
        var attRoleVo;
        for (var i = 0; i < attAry.length; i++) {
            attRoleVo = attAry[i];
            for (var j = 0; j < defAry.length; j++) {
                attRoleVo.attEnemyVos.push(defAry[j]);
            }
            if (attRoleVo.isEnemy) {
                attRoleVo.attEnemyVos.sort(function (a, b) {
                    //格子坐标规律
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
    /**
     * 跑角色技能cd
     */
    LoopBattleData.prototype.runRoleSkillCD = function () {
        if (this.attHeroVos) {
            this.attHeroVos.forEach(function (roleVo) {
                roleVo.runCD();
            });
        }
        if (this.attEnemyVos) {
            this.attEnemyVos.forEach(function (roleVo) {
                roleVo.runCD();
            });
        }
    };
    return LoopBattleData;
}());
var BattleTurnVo = /** @class */ (function () {
    function BattleTurnVo() {
    }
    BattleTurnVo.prototype.calculationAttribute = function () {
        this.defRoleVo.battleDieAttTimes--;
        this.defRoleVo.isDeath = this.defRoleVo.battleDieAttTimes <= 0;
        this.defRoleVo.isAtted = true;
        //添加战报数据
        if (this.defRoleVo.isDeath)
            BattleReportData.ins.addBattleReportVo(BattleReportDataType.BATTLE_DIE, this.attRoleVo.name, this.defRoleVo.name, this.attRoleVo.atk);
        else
            BattleReportData.ins.addBattleReportVo(BattleReportDataType.HURT, this.attRoleVo.name, this.defRoleVo.name, this.attRoleVo.atk);
        // console.log(this.defRoleVo.name ,this.defRoleVo.battleDieAttTimes);
    };
    return BattleTurnVo;
}());
//# sourceMappingURL=LoopBattleData.js.map