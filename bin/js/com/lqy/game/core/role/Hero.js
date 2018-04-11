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
    Hero.prototype.initRole = function (aniURL, scale, lineupVo) {
        _super.prototype.initRole.call(this, aniURL, scale, lineupVo);
        this.skeletonAni.pos(60 + (this.lineupVo.col - 1) * 120, 480 + (this.lineupVo.row - 1) * 100);
    };
    return Hero;
}(BaseRole));
//# sourceMappingURL=Hero.js.map