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
        var config = ConfigManager.ins.getHeroSkillSampleConfig(this.key);
        if (config) {
            this.name = config.name;
            this.cd = config.skillCD;
            this.modelId = config.modelId;
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
            // console.log(this.name + "cd时间："+this.calCD);
        }
    };
    return SkillVo;
}());
//# sourceMappingURL=SkillVo.js.map