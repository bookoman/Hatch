/*
* 战斗数据管理
*/
var BattleData = /** @class */ (function () {
    function BattleData() {
        var _this = this;
        this.curAttCamp = 0;
        this.attHeroVos = [];
        this.attEnemyVos = [];
        this.attedHeroVos = [];
        this.attedEnemyVos = [];
        GameDataManager.ins.selfPlayerData.roleVoAry.forEach(function (roleVo) {
            _this.attHeroVos.push(roleVo);
        });
        GameDataManager.ins.enemyData.roleVoAry.forEach(function (roleVo) {
            _this.attedEnemyVos.push(roleVo);
        });
        this.attHeroVos.sort(function (a, b) {
            return a.atts > b.atts ? -1 : 1;
        });
        this.attEnemyVos.sort(function (a, b) {
            return a.atts > b.atts ? -1 : 1;
        });
        console.log(this.attHeroVos);
        console.log(this.attEnemyVos);
    }
    BattleData.prototype.startAtt = function () {
        var turnAttckSum = GameConfig.BATTLE_TURN_ATTACK_SUM;
        var attTarget;
        var defTarget;
        var attToDefObject = {};
        if (this.curAttCamp == 0) {
        }
        else if (this.curAttCamp == BattleAttCampType.HERO) {
            attTarget = this.attHeroVos.splice(0, turnAttckSum);
        }
        else if (this.curAttCamp == BattleAttCampType.ENEMY) {
        }
    };
    BattleData.prototype.seekAttTarget = function (attAry, defAry) {
        var attToDefObject = {};
        var attRoleVo;
        var defRoleVo;
        for (var i = 0; i < attAry.length; i++) {
            attRoleVo = attAry[i];
            for (var j = 0; j < defAry.length; j++) {
                defRoleVo = defAry[j];
                if (attRoleVo.gridY == defRoleVo.gridY) {
                }
            }
        }
    };
    return BattleData;
}());
//# sourceMappingURL=BattleData.js.map