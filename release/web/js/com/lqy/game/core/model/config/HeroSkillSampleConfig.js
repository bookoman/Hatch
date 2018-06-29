/*
* 宠物技能配制表
*/
var HeroSkillSampleConfig = /** @class */ (function () {
    function HeroSkillSampleConfig() {
    }
    /**得到技能伤害 */
    HeroSkillSampleConfig.prototype.getSkillHurt = function (atk) {
        var tempAry = this.formula.split("*");
        var addString = tempAry[1];
        tempAry = addString.split("+");
        var value2 = Number(tempAry[0]);
        var value3 = Number(tempAry[1]);
        return atk * value2 + value3;
    };
    return HeroSkillSampleConfig;
}());
//# sourceMappingURL=HeroSkillSampleConfig.js.map