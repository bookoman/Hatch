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
* 怪物数据
*/
var MasterVo = /** @class */ (function (_super) {
    __extends(MasterVo, _super);
    function MasterVo() {
        return _super.call(this, true) || this;
    }
    MasterVo.prototype.initBaseData = function (masKey) {
        this.scale = 1;
        this.key = masKey ? masKey : this.masterKey;
        this.roleId = this.key + "_" + this.lineupGrid;
        var config = ConfigManager.ins.getMasterHeroSampleConfig(this.key);
        this.modelId = config.modelId;
        this.scale = config.modelSize;
        this.name = config.name;
        this.dieAttTimes = 3;
        this.atk = Number(config.atk);
        this.def = Number(config.def);
        this.hp = Number(config.hp);
        this.speed = Number(config.speed);
        this.doubleAtk = Number(config.doubleAtk);
        this.hurt = Number(config.hurt);
        this.tenacity = Number(config.tenacity);
        this.level = 0;
        this.upAtk = 0;
        this.updef = 0;
        /**技能数据 */
        this.skillVos = [];
        var skillVo = new SkillVo();
        var bool = skillVo.initData(config.skillKeys);
        if (bool) {
            this.skillVos.push(skillVo);
        }
    };
    return MasterVo;
}(BaseRoleVo));
//# sourceMappingURL=MasterVo.js.map