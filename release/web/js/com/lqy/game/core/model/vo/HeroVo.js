var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 宠物数据
*/
var HeroVo = /** @class */ (function (_super) {
    __extends(HeroVo, _super);
    function HeroVo() {
        return _super.call(this, false) || this;
    }
    HeroVo.prototype.initBaseData = function () {
        this.roleId = this.heroId;
        this.scale = -1;
        this.key = this.heroKey;
        var config = ConfigManager.ins.getHeroSampleConfig(this.heroKey);
        this.modelId = config.modelId;
        this.scale = config.modelSize;
        this.name = config.name;
        this.doubleAtk = this.heroAttr.doubleAtkRate;
        this.hurt = config.hurt;
        this.tenacity = config.tenacity;
        this.dieAttTimes = 1000;
        var qualityConfig = ConfigManager.ins.getQualitySampleConfig(this.qualityKey);
        this.upAtk = qualityConfig.aktMin;
        this.updef = qualityConfig.defMin;
        /**技能数据 */
        this.skillVos = [];
        var skillVo = new SkillVo();
        var bool = skillVo.initData(config.skillKey);
        //流血buff测试
        if (this.name == "美颌龙") {
            //流血技能
            bool = skillVo.initData("SK_0096");
            //单个加血技能
            // bool = skillVo.initData("SK_0061");
            //提升攻击力技能
            // bool = skillVo.initData("SK_0012");
            //嘲讽
            // bool = skillVo.initData("SK_0241");
            skillVo.cd = 3;
            skillVo.skillContinued = 2;
        }
        if (bool) {
            this.skillVos.push(skillVo);
        }
        _super.prototype.initBaseData.call(this);
    };
    return HeroVo;
}(BaseRoleVo));
/**生成属性 */
var HeroAttr = /** @class */ (function () {
    function HeroAttr() {
    }
    return HeroAttr;
}());
//# sourceMappingURL=HeroVo.js.map