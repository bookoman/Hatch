/*
* 技能Vo
*/
class SkillVo{
    public key:string;
    public name:string;
    public cd:number;
    public modelId:string;
    /**技能目标 */
    public skillTargetType:number;
    /**技能主效果 */
    public skillMainEffect:number;
    /**技能副效果 */
    public skillAssistantEffect:number;
    /**持续战斗轮数 */
    public skillContinued:number;
    /**技能配置表 */
    public skillConfig:HeroSkillSampleConfig;

    //计算数据
    public calCD:number = -1;
    /**CD完成是否使用该技能 */
    public isCanUse:boolean;
    
    constructor(){

    }
    /**初始化数据 */
    public initData(skillKey:string):boolean
    {
        this.key = skillKey;
        this.skillConfig = ConfigManager.ins.getHeroSkillSampleConfig(this.key);
        if(this.skillConfig)
        {
            this.name = this.skillConfig.name;
            this.cd = this.skillConfig.skillCD;
            this.modelId = this.skillConfig.modelId;
            this.skillTargetType = this.skillConfig.skillTargetType;
            this.skillMainEffect = this.skillConfig.skillMainEffect;
            this.skillAssistantEffect = this.skillConfig.skillAssistantEffect;
            this.skillContinued = this.skillConfig.skillContinued;
            return true;
        }
        return false;
    }
    /**cd计时跑起来 */
    public runCD():void
    {
        if(this.calCD != -1)
        {
            if(this.isCanUse)
            {
                this.calCD = this.cd;
            }
            else
            {
                this.calCD--;
                if(this.calCD <= 0)
                {
                    this.calCD = 0;
                    this.isCanUse = true;
                }
            }
            console.log(this.name + "cd时间："+this.calCD);
        }
    }
    /**重置cd */
    public resetCD():void
    {
        this.isCanUse = false;
        this.calCD = this.cd;
    }
    /**得到技能伤害 */
    // public getSkillHurt(realAtk:number):number
    // {
    //     var skillHurt:number = 1;
    //     if(this.skillConfig && this.skillConfig.skillMainEffect == SkillEffect.HURT && this.skillConfig.skillAssistantEffect == SkillEffect.HURT)
    //     {
    //         skillHurt = this.skillConfig.getSkillHurt(realAtk);
    //     }
    //     return skillHurt;
    // }
    // /**得到流血值 */
    // public getBleedingValue(realAtk:number):number
    // {
    //     var bleeding:number = 0;
    //     if(this.skillConfig && this.skillConfig.skillMainEffect == SkillEffect.BLEEDING && this.skillConfig.skillAssistantEffect == SkillEffect.BLEEDING)
    //     {
    //         bleeding = this.skillConfig.getSkillBleeding(realAtk);
    //     }
    //     return 
    // }
    // /**得到增加攻击力值 */
    // public getAddAtkValue(realAtk:number):number
    // {
    //     var bleeding:number = 0;
    //     if(this.skillConfig && this.skillConfig.skillMainEffect == SkillEffect.BLEEDING && this.skillConfig.skillAssistantEffect == SkillEffect.BLEEDING)
    //     {
    //         bleeding = this.skillConfig.getAddAtkValue(realAtk);
    //     }
    //     return 
    // }
}