/*
* 技能Vo
*/
var SkillVo = /** @class */ (function () {
    function SkillVo() {
        //计算数据
        this.calCD = -1;
    }
    /**初始化数据 */
    SkillVo.prototype.initData = function (skillKey) {
        this.key = skillKey;
        this.skillConfig = ConfigManager.ins.getHeroSkillSampleConfig(this.key);
        if (this.skillConfig) {
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
    };
    /**cd计时跑起来 */
    SkillVo.prototype.runCD = function () {
        if (this.calCD != -1) {
            if (this.isCanUse) {
                this.calCD = this.cd;
            }
            else {
                this.calCD--;
                if (this.calCD <= 0) {
                    this.calCD = 0;
                    this.isCanUse = true;
                }
            }
            console.log(this.name + "cd时间：" + this.calCD);
        }
    };
    /**重置cd */
    SkillVo.prototype.resetCD = function () {
        this.isCanUse = false;
        this.calCD = this.cd;
    };
    return SkillVo;
}());
//# sourceMappingURL=SkillVo.js.map