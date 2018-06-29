/*
* boss战斗轮数据
*/
class BossBattleRoleData{
    /**伤害 */
    public hurt:number;
    /**流血 */
    public bleeding:number;
    /**中毒 */
    public poisoning:number;
    /**吸血 */
    public bloodSucking:number;
    /**恢复 */
    public recovery:number;
    /**遗忘 */
    public forget:number;
    /**混乱 */
    public confusion;
    /**愤怒 */
    public anger:number;
    /**增加攻击力 */
    public addAtk:number;
    /**增加防御力 */
    public addDef:number;
    /**增加速度 */
    public addSpeed:number;
    /**增加血量上限 */
    public addBloodUpLimit:number;
    /**回血 */
    public recoveryBlood:number;
    /**解除负面效果 */
    public eliminateNegativeEffect:number;
    /**解除正面效果 */
    public eliminatePositiveEffect:number;
    /**增加免伤 */
    public addInjuryFree:number;
    /**减少对方治疗量 */
    public reduceEnemyTreatment:number;
    constructor(){
        this.hurt = 0;
        this.bleeding = 0;
        this.poisoning = 0;
        this.recovery = 0;
        this.forget = 0;
        this.confusion = 0;
        this.anger = 0;
        this.addAtk = 0;
        this.addDef = 0;
        this.addSpeed = 0;
        this.addBloodUpLimit = 0;
        this.recoveryBlood = 0;
        this.eliminateNegativeEffect = 0;
        this.addInjuryFree = 0;
        this.reduceEnemyTreatment = 0;
    }
}