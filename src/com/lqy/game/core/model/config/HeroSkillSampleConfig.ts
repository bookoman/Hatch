/*
* 宠物技能配制表
*/
class HeroSkillSampleConfig{
    public key:string;
    public icon:string;
    public name:string;
    public skillRankLevel:number;
    public rankSkillName:string;
    public skillLevel:number;
    public skillLevelExp:number;
    public nextSkillKey:string;
    public upRankprobability:number;
    public nextRankSkillKey:string;
    public skillTargetType:number;
    public skillMainEffect:string;
    public skillAssistantEffect:string;
    public skillDesc:string;
    public formula:string;
    constructor(){

    }
    /**得到技能伤害 */
    public getSkillHurt(atk:number):number
    {
        var tempAry:Array<string> = this.formula.split("*");
        var addString:string = tempAry[1];
        tempAry = addString.split("+");
        var value2:number = Number(tempAry[0]);
        var value3:number = Number(tempAry[1]);
        return atk * value2 + value3;
    }
}