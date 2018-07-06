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
* 英雄
*/
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        return _super.call(this) || this;
    }
    Hero.prototype.initRole = function (baseRoleVo, showPriority, scale, parentDis, showBloodBar) {
        _super.prototype.initRole.call(this, baseRoleVo, showPriority, scale, parentDis, showBloodBar);
        // this.skeletonAni.pos(roleVo.posPoint.x,roleVo.posPoint.y);
        this.x = baseRoleVo.posPoint.x;
        this.y = baseRoleVo.posPoint.y;
    };
    return Hero;
}(BaseRole));
//# sourceMappingURL=Hero.js.map