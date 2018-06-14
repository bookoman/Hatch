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
        this.name = config.name;
        this.dieAttTimes = 1000;
        this.atk = this.atk;
        this.atkSpeed = this.speed;
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