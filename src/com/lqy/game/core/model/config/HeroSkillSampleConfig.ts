/*
* 宠物技能配制表
*/
class HeroSkillSampleConfig{
    public key:string;
    public icon:string;
    public name:string;
    public skillLevel:string;
    public skillLevelExp:number;
    public nextSkillKey:string;
    public skillRankLevel:number;
    public rankSkillName:string;
    public upRankprobability:number;
    public nextRankSkillKey:string;
    public skillTargetType:number;
    public skillMainEffect:number;
    public skillAssistantEffect:number;
    public subSkillRato:number;
    public skillCD:number;
    public modelId:string;
    public skillContinued:number;
    public formula:string;
    public skillDesc:string;
    /**副效果目标类型 */
    public subSkillTargetType:string;
    /**主效果触发概率 */
    public mainSkillRato:number;
    /**副特效资源文件 */
    public subModelId:string;
    /**副效果持续时间 */
    public subSkillContinued:number;
    /**副效果公式 */
    public subFormula:string;
    

    constructor(){

    }
    
}