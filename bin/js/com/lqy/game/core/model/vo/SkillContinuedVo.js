/*
* 技能持续Vo
*/
var SkillContinuedVo = /** @class */ (function () {
    function SkillContinuedVo() {
        this.resetData();
    }
    /**设置数据 */
    SkillContinuedVo.prototype.setData = function (config, isAssistantEffect) {
        isAssistantEffect = isAssistantEffect === undefined ? false : isAssistantEffect;
        var effectType = isAssistantEffect ? config.skillMainEffect : config.skillAssistantEffect;
        switch (effectType) {
            case SkillEffect.HURT:
                this.hurt = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.BLEEDING:
                this.bleeding = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.POISONING:
                this.poisoning = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.RECOVERY:
                this.recovery = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.FORGET:
                this.forget = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.CONFUSION:
                this.confusion = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.ANGER:
                this.anger = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.ADD_ATK:
                this.addAtk = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.ADD_DEF:
                this.addDef = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.ADD_SPEED:
                this.addSpeed = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.ADD_BLOOD_UP_LIMIT:
                this.addBloodUpLimit = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.RECOVERY_BLOOD:
                this.recoveryBlood = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.ELIMINATE_NEGATIVE_EFFECT:
                this.eliminateNegativeEffect = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.ADD_INJURY_FREE:
                this.addInjuryFree = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
            case SkillEffect.REDUCE_ENEMY_TREATMENT:
                this.reduceEnemyTreatment = config.skillContinued === undefined ? 1 : config.skillContinued;
                break;
        }
    };
    /**重置数据 */
    SkillContinuedVo.prototype.resetData = function () {
        // for (var key in this) {
        //     if (this.hasOwnProperty(key) &&  typeof this[key] === "number") {
        //         this[String(key)] = 0;
        //     }
        // }
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
    };
    /**跑轮数 */
    SkillContinuedVo.prototype.runEffectTurnCD = function () {
        // for (var key in this) {
        //     if (this.hasOwnProperty(key) &&  typeof this[key] === "number") {
        //         var value:number = this[String(key)];
        //         if(value > 0)
        //         {
        //             value--;
        //         }
        //     }
        // }
        if (this.hurt > 0)
            this.hurt--;
        if (this.bleeding > 0)
            this.bleeding--;
        if (this.poisoning > 0)
            this.poisoning--;
        if (this.recovery > 0)
            this.recovery--;
        if (this.forget > 0)
            this.forget--;
        if (this.confusion > 0)
            this.confusion--;
        if (this.anger > 0)
            this.anger--;
        if (this.addAtk > 0)
            this.addAtk--;
        if (this.addDef > 0)
            this.addDef--;
        if (this.addSpeed > 0)
            this.addSpeed--;
        if (this.addBloodUpLimit > 0)
            this.addBloodUpLimit--;
        if (this.recoveryBlood > 0)
            this.recoveryBlood--;
        if (this.eliminateNegativeEffect > 0)
            this.eliminateNegativeEffect--;
        if (this.addInjuryFree > 0)
            this.addInjuryFree--;
        if (this.reduceEnemyTreatment > 0)
            this.reduceEnemyTreatment--;
    };
    return SkillContinuedVo;
}());
//# sourceMappingURL=SkillContinuedVo.js.map