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
* 假打NPC敌人
*/
var MasterNPCVo = /** @class */ (function (_super) {
    __extends(MasterNPCVo, _super);
    function MasterNPCVo() {
        return _super.call(this, true) || this;
    }
    MasterNPCVo.prototype.initBaseData = function (masKey) {
        this.scale = 1;
        this.key = masKey ? masKey : this.masterKey;
        this.roleId = this.key + "_" + this.lineupGrid;
        var config = ConfigManager.ins.getMasterHeroSampleConfig(this.key);
        this.modelId = config.modelId;
        this.scale = config.modelSize;
        this.name = config.name;
        this.dieAttTimes = 3;
        this.atk = config.atk;
        this.speed = config.speed;
        this.level = 1;
    };
    return MasterNPCVo;
}(BaseRoleVo));
//# sourceMappingURL=MasterNPCVo.js.map