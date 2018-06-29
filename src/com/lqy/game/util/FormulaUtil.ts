/*
* 公式工具类
*/
class FormulaUtil{
    constructor(){

    }
    /**
     * 普通伤害真实伤害公式
     * @param attVo 
     * @param defVo 
     */
    public static realDamageValue(atkVo:BaseRoleVo,defVo:BaseRoleVo,skillHurt?:number):number
    {
        skillHurt = skillHurt === undefined ? 1 : skillHurt;
        var realAtk:number = atkVo.realAtk;
        var realDef:number = atkVo.realDef;
        //暴击概率
        var doubleValue:number = Math.random() < atkVo.doubleAtk ? 1 : 0;
        //真实暴击比例
        var realDoubleProport:number = Math.max(1,atkVo.hurt - defVo.tenacity);
        /**技能伤害 */
        // var skillHurt:number = atkVo.skillMainFormula ? atkVo.getSkillHurt(realAtk) : 1;
        // skillKey = "SK_0021";
        // var skillConfig:HeroSkillSampleConfig = ConfigManager.ins.getHeroSkillSampleConfig(skillKey);
        // var skillHurt:number = skillConfig ? skillConfig.getSkillHurt(realAtk) : 1;
        //realDamage=（技能基础伤害+技能实际公式运算）*(1-(0.07*ln(int((realDef/100)+1）+0.01)))*(1+是否暴击*真实暴击比例*暴击控制参数)*random(0.9,1.1)*总控制参数
        var atkValue:number = skillHurt == 1 ? realAtk : skillHurt;
        var rundowValue:number = 0.9 + Math.random() * (1.1 - 0.9);													
        var sumHurt:number = atkValue * (1-0.07*Math.log(Math.ceil(realDef/100)+0.01))*(1+doubleValue*realDoubleProport*1)*rundowValue*1;
        return Math.ceil(sumHurt);
    }
    
    
}