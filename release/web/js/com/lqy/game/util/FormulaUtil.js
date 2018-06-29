/*
* 公式工具类
*/
var FormulaUtil = /** @class */ (function () {
    function FormulaUtil() {
    }
    /**
     * 真实伤害公式
     * @param attVo
     * @param defVo
     */
    FormulaUtil.realDamageValue = function (atkVo, defVo, skillKey) {
        var realAtk = atkVo.atk + atkVo.level * atkVo.upAtk;
        var realDef = defVo.def + defVo.level * defVo.updef;
        //暴击概率
        var doubleValue = Math.random() < atkVo.doubleAtk ? 1 : 0;
        //真实暴击比例
        var realDoubleProport = Math.max(1, atkVo.hurt - defVo.tenacity);
        /**技能伤害 */
        skillKey = "SK_0021";
        var skillConfig = ConfigManager.ins.getHeroSkillSampleConfig(skillKey);
        var skillHurt = skillConfig ? skillConfig.getSkillHurt(realAtk) : 1;
        //realDamage=（技能基础伤害+技能实际公式运算）*(1-(0.07*ln(int((realDef/100)+1）+0.01)))*(1+是否暴击*真实暴击比例*暴击控制参数)*random(0.9,1.1)*总控制参数
        var rundowValue = 0.9 + Math.random() * (1.1 - 0.9);
        var sumHurt = skillHurt * (1 - 0.07 * Math.log(Math.ceil(realDef / 100) + 0.01)) * (1 + doubleValue * realDoubleProport * 1) * rundowValue * 1;
        return Math.ceil(sumHurt);
    };
    return FormulaUtil;
}());
//# sourceMappingURL=FormulaUtil.js.map