/*
* 战斗数据管理器
*/
var BattleDataManager = /** @class */ (function () {
    function BattleDataManager() {
        this.curAttCamp = 0;
    }
    Object.defineProperty(BattleDataManager, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new BattleDataManager();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    BattleDataManager.prototype.initData = function () {
        this.attHeroVos = GameDataManager.ins.selfPlayerData.roleVoAry;
        this.attEnemyVos = GameDataManager.ins.enemyData.roleVoAry;
        this.attHeroVos.forEach(function (roleVo) {
            roleVo.battleHP = roleVo.hp;
            roleVo.isDeath = false;
            roleVo.attEnemyVos = [];
        });
        this.attEnemyVos.forEach(function (roleVo) {
            roleVo.battleHP = roleVo.hp;
            roleVo.isDeath = false;
            roleVo.attEnemyVos = [];
        });
        this.seekAttTarget(this.attHeroVos, this.attEnemyVos);
        this.seekAttTarget(this.attEnemyVos, this.attHeroVos);
        this.curAttCamp = BattleAttCampType.HERO;
    };
    /**
     * 开始战斗
     */
    BattleDataManager.prototype.startAtt = function () {
        var turnAttckSum = GameConfig.BATTLE_TURN_ATTACK_SUM;
        var attRoleVo;
        if (this.curAttCamp == 0) {
        }
        else if (this.curAttCamp == BattleAttCampType.HERO) {
            this.curAttRoleVo = this.getAttRoleVo(this.attHeroVos);
        }
        else if (this.curAttCamp == BattleAttCampType.ENEMY) {
            this.curAttRoleVo = this.getAttRoleVo(this.attEnemyVos);
        }
        //寻找攻击具体对象
        for (var i = 0; i < this.curAttRoleVo.attEnemyVos.length; i++) {
            this.curDefRoleVo = this.curAttRoleVo.attEnemyVos[i];
            if (!this.curDefRoleVo.isDeath) {
                break;
            }
        }
    };
    /**计算属性 */
    BattleDataManager.prototype.calculationAttribute = function () {
        this.curDefRoleVo.battleHP -= this.curAttRoleVo.att;
        this.curDefRoleVo.isDeath = this.curDefRoleVo.battleHP <= 0;
        this.curAttRoleVo.isAtted = true;
        this.checkBattleEnd();
        // console.log("....."+this.curDefRoleVo.isDeath,this.curDefRoleVo.id,this.curDefRoleVo.hp);
    };
    /**
     * 检测战斗结束
     */
    BattleDataManager.prototype.checkBattleEnd = function () {
        var _this = this;
        //检测战斗结束，玩家英雄阵营没有活的对象战斗失败，反之战斗胜利
        //英雄检测
        this.isEnd = true;
        var isChangeAttStatus = true;
        this.attHeroVos.forEach(function (roleVo) {
            if (!roleVo.isDeath) {
                _this.isEnd = false;
            }
            if (!roleVo.isAtted) {
                isChangeAttStatus = false;
            }
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
                _this.isEnd = false;
            }
            if (!roleVo.isAtted) {
                isChangeAttStatus = false;
            }
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
    BattleDataManager.prototype.getAttRoleVo = function (roleVos) {
        var roleVo;
        for (var i = 0; i < roleVos.length; i++) {
            roleVo = roleVos[i];
            if (!roleVo.isDeath && !roleVo.isAtted) {
                break;
            }
        }
        return roleVo;
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
    BattleDataManager.prototype.seekAttTarget = function (attAry, defAry) {
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
    BattleDataManager._ins = null;
    return BattleDataManager;
}());
//# sourceMappingURL=BattleDataManager.js.map